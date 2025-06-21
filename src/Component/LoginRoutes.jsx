import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoutes = () => {
  const [cookies] = useCookies(["isLoggedIn"]);

  return cookies.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;