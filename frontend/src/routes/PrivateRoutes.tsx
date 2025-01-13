import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/user/UserContext";

const PrivateRoutes = () => {
  const user = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
