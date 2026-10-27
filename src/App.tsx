import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import DashboardPage from "./Dashboard.tsx";

import { lazy, Suspense } from "react";

const TasksLazyLoaded = lazy(() => import("./boards/Tasks.tsx"));
const CounterLazyLoaded = lazy(() => import("./boards/Counter.tsx"));

const router = createBrowserRouter([
  { path: "/dashboard", element: <DashboardPage /> },
  {
    path: "/counter",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <CounterLazyLoaded />
      </Suspense>
    ),
  },
  {
    path: "/tasks",
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <TasksLazyLoaded />
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
