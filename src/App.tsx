import { initializeApp } from 'firebase/app'
import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.scss'
import HeaderTable from './components/headerTable'
import { Loader } from './components/loader'
import { ErrorTemplate } from './pages/error'
import History from './pages/history'
import { RemindExamination } from './pages/vocab-trainer/components/remindExamination'

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
const QuestionLazy = lazy(
  () => import('./pages/vocab-trainer/components/question')
)
const VocabLazy = lazy(() => import('./pages/vocab'))
const VocabTrainerLazy = lazy(() => import('./pages/vocab-trainer'))
const DashboardLazy = lazy(() => import('./pages/dashboard'))
const AIChatLazy = lazy(() => import('./pages/ai-chat'))
const ResultStatisticLazy = lazy(
  () => import('./pages/vocab-trainer/components/resultStatistic')
)

function App() {
  const routes = [
    {
      element: (
        <Suspense fallback={<Loader />}>
          <LayoutLazy />
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
          element: <RemindExamination />
        },
        {
          path: '/vocab-trainer/examination/result',
          element: <ResultStatisticLazy />
        },
        { path: '/history', element: <History /> },
        { path: '/community', element: <History /> },
        { path: '/settings', element: <History /> },
        { path: '/help-support', element: <History /> },
        { path: '/ai-chat', element: <AIChatLazy /> }
      ]
    },
    { path: '*', element: <ErrorTemplate /> }
  ]

  const element = useRoutes(routes)

  return <>{element}</>
}

export default App
