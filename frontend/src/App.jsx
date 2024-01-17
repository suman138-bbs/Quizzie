import { useRoutes } from "react-router-dom";
import { Suspense } from "react";

import AuthLayout from "./layout/auth";
import PrivateLayout from "./layout/private";

function App() {
  const routing = useRoutes([
    {
      path: "/auth/*",
      element: <AuthLayout />,
    },
    {
      path: "/app/*",
      element: <PrivateLayout />,
    },
  ]);

  return <Suspense fallback={"Loading....."}>{routing}</Suspense>;
}

export default App;
