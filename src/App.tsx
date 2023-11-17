import { useRoutes } from 'react-router-dom';
import './App.scss';
import Dashboard from './pages/dashboard';
import { ErrorTemplate } from './pages/error';
import { Suspense, lazy } from 'react';

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
      ],
    },
    { path: '*', element: <ErrorTemplate /> },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
}

export default App;
