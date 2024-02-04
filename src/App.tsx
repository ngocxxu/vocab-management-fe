import { initializeApp } from "firebase/app";
import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/dashboard";
import { ErrorTemplate } from "./pages/error";
import History from "./pages/history";
import Vocab from "./pages/vocab";
import VocabTrainer from "./pages/vocab-trainer";

const firebaseConfig = {
  apiKey: "AIzaSyAhopedDbZte4fXSGgg5onc9iOxiqYBZN4",
  authDomain: "vocab-management.firebaseapp.com",
  projectId: "vocab-management",
  storageBucket: "vocab-management.appspot.com",
  messagingSenderId: "314055413964",
  appId: "1:314055413964:web:ceb855a96a28cf1403f269",
};

initializeApp(firebaseConfig);

const LayoutLazy = lazy(() => import("./pages/layout"));
function App() {
  const routes = [
    {
      element: (
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center bg-white h-screen">
              <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute" />
            </div>
          }
        >
          <LayoutLazy />
        </Suspense>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/vocab", element: <Vocab /> },
        { path: "/vocab-trainer", element: <VocabTrainer /> },
        { path: "/history", element: <History /> },
      ],
    },
    { path: "*", element: <ErrorTemplate /> },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
}

export default App;
