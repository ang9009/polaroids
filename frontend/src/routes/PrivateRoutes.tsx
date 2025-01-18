/* eslint-disable jsdoc/require-returns */
import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useUser";

/**
 * Redirects users to the login page unless authenticated.
 */
const PrivateRoutes = () => {
  const { isPending, data: user } = useUser();

  return isPending ? <></> : user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
