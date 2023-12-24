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
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAhopedDbZte4fXSGgg5onc9iOxiqYBZN4',
  authDomain: 'vocab-management.firebaseapp.com',
  projectId: 'vocab-management',
  storageBucket: 'vocab-management.appspot.com',
  messagingSenderId: '314055413964',
  appId: '1:314055413964:web:ceb855a96a28cf1403f269',
};

initializeApp(firebaseConfig);

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
