import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Suspense, useEffect } from "react";

import AuthLayout from "./layout/auth";
import PrivateLayout from "./layout/private";

import useAuth from "./hooks/useAuth";
import useRefToken from "./hooks/useRefToken";

function App() {
  const { auth } = useAuth();
  const refresh = useRefToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      console.log("Auth", auth);
      if (!auth.name) {
        const path = pathname.split("/").includes("auth");
        if (path) {
          navigate("/auth");
          return;
        }
        const token = await refresh();
        if (!token) {
          navigate("auth");
          return;
        }
        navigate("/app/dashboard");
      } else {
        navigate("/auth");
      }
    };
    handleAuth();
  }, [navigate]);
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
