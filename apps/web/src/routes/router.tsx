import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Curriculum } from '@/pages/Curriculum';
import { DayView } from '@/pages/DayView';
import { TopicView } from '@/pages/TopicView';
import { LessonView } from '@/pages/LessonView';
import { Practice } from '@/pages/Practice';
import { CodingLab } from '@/pages/CodingLab';
import { CodingProblem } from '@/pages/CodingProblem';
import { Assessments } from '@/pages/Assessments';
import { AssessmentView } from '@/pages/AssessmentView';
import { Projects } from '@/pages/Projects';
import { ProjectView } from '@/pages/ProjectView';
import { KnowledgeMap } from '@/pages/KnowledgeMap';
import { Revision } from '@/pages/Revision';
import { Settings } from '@/pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error loading layout</div>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'curriculum', element: <Curriculum /> },
      { path: 'curriculum/:day', element: <DayView /> },
      { path: 'topics/:topicId', element: <TopicView /> },
      { path: 'lessons/:lessonId', element: <LessonView /> },
      { path: 'practice', element: <Practice /> },
      { path: 'coding', element: <CodingLab /> },
      { path: 'coding/:problemId', element: <CodingProblem /> },
      { path: 'assessments', element: <Assessments /> },
      { path: 'assessments/:assessmentId', element: <AssessmentView /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:projectId', element: <ProjectView /> },
      { path: 'knowledge-map', element: <KnowledgeMap /> },
      { path: 'revision', element: <Revision /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
