import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { auth } = useAuth();
  if (auth?.user) {
    toast.success("User Logged In Successfully");
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
