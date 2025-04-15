import { Navigate } from "react-router";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "./AuthContext";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const {loading,isUserLogin } = useAuth();
  if (!isUserLogin() && !loading ) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};

export const UnprotectedRoute = ({ children }: { children: JSX.Element }) => {
  const {loading,isUserLogin } = useAuth();
  if (isUserLogin() && !loading) {
    return <Navigate to={ROUTES.PANEL} replace />;
  }
  return children;
};
