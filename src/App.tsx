import { useRoutes } from 'react-router-dom';
import './App.scss';
import Dashboard from './pages/dashboard';
import { ErrorTemplate } from './pages/error';
import { Suspense, lazy } from 'react';
import Vocab from './pages/vocab';
import VocabTrainer from './pages/vocab-trainer';
import History from './pages/history';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const LayoutLazy = lazy(() => import('./pages/layout'));
function App() {
  const routes = [
    {
      element: (
        <Suspense fallback={<>Loading...</>}>
          <LayoutLazy />
        </Suspense>
      ),
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/vocab', element: <Vocab /> },
        { path: '/vocab-trainer', element: <VocabTrainer /> },
        { path: '/history', element: <History /> },
      ],
    },
    { path: '*', element: <ErrorTemplate /> },
  ];

  const element = useRoutes(routes);

  return <MantineProvider theme={theme}>{element}</MantineProvider>;
}

export default App;
