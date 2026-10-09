import subprocess
import tempfile
import os
import json
import signal
import resource
import time
from typing import List, Dict, Any, Optional
from pathlib import Path

from schemas import ExecutionRequest, ExecutionResponse, ExecutionStatus, TestCaseResult, Language


class CodeExecutor:
    def __init__(self):
        self.temp_dir = Path(tempfile.gettempdir()) / 'sarah-code-runner'
        self.temp_dir.mkdir(exist_ok=True)

    def _create_temp_file(self, code: str, language: Language) -> Path:
        ext = {'python': '.py', 'javascript': '.js', 'typescript': '.ts'}[language.value]
        temp_file = self.temp_dir / f'run_{int(time.time() * 1000)}{ext}'
        temp_file.write_text(code)
        return temp_file

    def _run_python(self, file_path: Path, stdin: Optional[str], timeout: int) -> subprocess.CompletedProcess:
        return subprocess.run(
            ['python3', str(file_path)],
            input=stdin,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=self.temp_dir,
        )

    def _run_javascript(self, file_path: Path, stdin: Optional[str], timeout: int) -> subprocess.CompletedProcess:
        return subprocess.run(
            ['node', str(file_path)],
            input=stdin,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=self.temp_dir,
        )

    def _run_typescript(self, file_path: Path, stdin: Optional[str], timeout: int) -> subprocess.CompletedProcess:
        # First compile
        compile_result = subprocess.run(
            ['tsc', str(file_path), '--target', 'ES2020', '--module', 'commonjs', '--outDir', str(self.temp_dir)],
            capture_output=True,
            text=True,
            timeout=30,
            cwd=self.temp_dir,
        )
        if compile_result.returncode != 0:
            return subprocess.CompletedProcess(
                args=['tsc'],
                returncode=1,
                stdout='',
                stderr=compile_result.stderr,
            )
        # Run compiled JS
        js_file = self.temp_dir / f'{file_path.stem}.js'
        return subprocess.run(
            ['node', str(js_file)],
            input=stdin,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=self.temp_dir,
        )

    def execute(self, request: ExecutionRequest) -> ExecutionResponse:
        start_time = time.time()
        file_path = None

        try:
            file_path = self._create_temp_file(request.code, request.language)

            # Run with test cases
            test_results = []
            all_passed = True

            for i, test_case in enumerate(request.test_cases):
                test_start = time.time()
                stdin = test_case.get('stdin', request.stdin)

                try:
                    if request.language == Language.PYTHON:
                        result = self._run_python(file_path, stdin, request.timeout_seconds)
                    elif request.language == Language.JAVASCRIPT:
                        result = self._run_javascript(file_path, stdin, request.timeout_seconds)
                    elif request.language == Language.TYPESCRIPT:
                        result = self._run_typescript(file_path, stdin, request.timeout_seconds)
                    else:
                        raise ValueError(f'Unsupported language: {request.language}')

                    execution_time = int((time.time() - test_start) * 1000)

                    # Parse expected vs actual
                    expected = test_case.get('expected', {})
                    actual_output = result.stdout.strip()

                    # Simple comparison - in production, use proper JSON parsing
                    passed = result.returncode == 0 and actual_output == str(expected.get('output', ''))

                    if not passed:
                        all_passed = False

                    test_results.append(TestCaseResult(
                        passed=passed,
                        input=test_case.get('input', {}),
                        expected=expected,
                        actual={'output': actual_output},
                        error=result.stderr if result.stderr else None,
                        execution_time_ms=execution_time,
                    ))

                except subprocess.TimeoutExpired:
                    test_results.append(TestCaseResult(
                        passed=False,
                        input=test_case.get('input', {}),
                        expected=test_case.get('expected', {}),
                        actual={},
                        error='Execution timed out',
                        execution_time_ms=request.timeout_seconds * 1000,
                    ))
                    all_passed = False
                    break

                except Exception as e:
                    test_results.append(TestCaseResult(
                        passed=False,
                        input=test_case.get('input', {}),
                        expected=test_case.get('expected', {}),
                        actual={},
                        error=str(e),
                        execution_time_ms=int((time.time() - test_start) * 1000),
                    ))
                    all_passed = False

            # Determine overall status
            if not test_results:
                # Just run the code once
                if request.language == Language.PYTHON:
                    result = self._run_python(file_path, request.stdin, request.timeout_seconds)
                elif request.language == Language.JAVASCRIPT:
                    result = self._run_javascript(file_path, request.stdin, request.timeout_seconds)
                else:
                    result = self._run_typescript(file_path, request.stdin, request.timeout_seconds)

                execution_time = int((time.time() - start_time) * 1000)

                if result.returncode == 0:
                    return ExecutionResponse(
                        status=ExecutionStatus.SUCCESS,
                        stdout=result.stdout,
                        stderr=result.stderr,
                        execution_time_ms=execution_time,
                    )
                else:
                    return ExecutionResponse(
                        status=ExecutionStatus.ERROR,
                        stdout=result.stdout,
                        stderr=result.stderr,
                        execution_time_ms=execution_time,
                        error_message=result.stderr,
                    )

            # Has test cases
            total_time = int((time.time() - start_time) * 1000)

            if all_passed:
                return ExecutionResponse(
                    status=ExecutionStatus.SUCCESS,
                    test_results=test_results,
                    execution_time_ms=total_time,
                )
            else:
                failed = [r for r in test_results if not r.passed]
                return ExecutionResponse(
                    status=ExecutionStatus.ERROR,
                    test_results=test_results,
                    execution_time_ms=total_time,
                    error_message=f'{len(failed)} test(s) failed',
                )

        except subprocess.TimeoutExpired:
            return ExecutionResponse(
                status=ExecutionStatus.TIMEOUT,
                execution_time_ms=request.timeout_seconds * 1000,
                error_message='Execution timed out',
            )
        except Exception as e:
            return ExecutionResponse(
                status=ExecutionStatus.ERROR,
                execution_time_ms=int((time.time() - start_time) * 1000),
                error_message=str(e),
            )
        finally:
            # Cleanup
            if file_path and file_path.exists():
                file_path.unlink(missing_ok=True)
            # Clean up any generated JS files
            for f in self.temp_dir.glob('*.js'):
                if f.stat().st_mtime < time.time() - 3600:
                    f.unlink(missing_ok=True)


executor = CodeExecutor()
