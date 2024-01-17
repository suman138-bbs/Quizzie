import { Outlet, useRoutes } from "react-router-dom";

import Dashboard from "../../components/dashboard/dashboard.component";
import { Suspense } from "react";

const Layout = () => {
  return (
    <div>
      Private Layout
      <Outlet />
    </div>
  );
};

const PrivateLayout = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <Suspense fallback={"Loading...."}>{routing}</Suspense>;
};

export default PrivateLayout;
