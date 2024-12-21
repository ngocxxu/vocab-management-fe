import { initializeApp } from 'firebase/app'
import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.scss'
import HeaderTable from './components/headerTable'
import { Loader } from './components/loader'
import { ProtectRoute } from './components/protectRoute'
import { ErrorTemplate } from './pages/error'
import History from './pages/history'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'vocab-management.firebaseapp.com',
  projectId: 'vocab-management',
  storageBucket: 'vocab-management.appspot.com',
  messagingSenderId: '314055413964',
  appId: '1:314055413964:web:ceb855a96a28cf1403f269'
}

initializeApp(firebaseConfig)

const LayoutLazy = lazy(() => import('./pages/layout'))
const SecurityLayoutLazy = lazy(() => import('./pages/security-layout'))
const QuestionLazy = lazy(
  () => import('./pages/vocab-trainer/components/question')
)
const VocabLazy = lazy(() => import('./pages/vocab'))
const VocabTrainerLazy = lazy(() => import('./pages/vocab-trainer'))
const DashboardLazy = lazy(() => import('./pages/dashboard'))
const LoginLazy = lazy(() => import('./pages/auth/login'))
const SignupLazy = lazy(() => import('./pages/auth/signup'))
const SignupSuccessLazy = lazy(() => import('./pages/auth/signup-success'))
const RemindExaminationLazy = lazy(
  () => import('./pages/vocab-trainer/components/remindExamination')
)
const AIChatLazy = lazy(() => import('./pages/ai-chat'))
const ResultStatisticLazy = lazy(
  () => import('./pages/vocab-trainer/components/resultStatistic')
)
const SettingsLayoutLazy = lazy(() => import('./pages/settings'))

function App() {
  const routes = [
    {
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectRoute>
            <LayoutLazy />
          </ProtectRoute>
        </Suspense>
      ),
      children: [
        { path: '/', element: <DashboardLazy /> },
        { path: '/dashboard', element: <DashboardLazy /> },
        {
          path: '/vocab',
          element: (
            <HeaderTable
              headText="Vocabulary List"
              bodyText={
                <>
                  Let your second world be opened up thanks to the vocabulary
                  list below. <br />
                  Let's run, don't hesitate!
                </>
              }
            >
              <VocabLazy />
            </HeaderTable>
          )
        },
        { path: '/vocab-trainer', element: <VocabTrainerLazy /> },
        { path: '/vocab-trainer/examination', element: <QuestionLazy /> },
        {
          path: '/vocab-trainer/remind-examination/:id',
          element: <RemindExaminationLazy />
        },
        {
          path: '/vocab-trainer/examination/result',
          element: <ResultStatisticLazy />
        },
        { path: '/history', element: <History /> },
        { path: '/community', element: <History /> },
        {
          path: '/settings',
          element: <SettingsLayoutLazy />
        },
        { path: '/help-support', element: <History /> },
        { path: '/ai-chat', element: <AIChatLazy /> }
      ]
    },
    {
      element: (
        <Suspense fallback={<Loader />}>
          <SecurityLayoutLazy />
        </Suspense>
      ),
      children: [
        { path: '/login', element: <LoginLazy /> },
        { path: '/signup', element: <SignupLazy /> }
      ]
    },
    { path: '/signup-success', element: <SignupSuccessLazy /> },
    { path: '*', element: <ErrorTemplate /> }
  ]

  const element = useRoutes(routes)

  return <>{element}</>
}

export default App
