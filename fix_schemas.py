import json, pathlib; [print('Fixed:', f.name) if (t:=f.read_text()).replace('\
\:', '\\:') != t and f.write_text(t) is None else print('OK:', f.name) for f in pathlib.Path('D:/02_Projects/Sarah/curriculum/schema').glob('*.json')]
