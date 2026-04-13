import { Navigate } from "react-router-dom";
import { useContext, type JSX } from "react";
import AuthContext from "./AuthContext";


type Props = {
  children: JSX.Element;
  allowedRoles?: ("USER" | "ADMIN")[];
};

export function ProtectedRoute({ children, allowedRoles }: Props) {
  const auth = useContext(AuthContext)!;

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role!)) {
    return <Navigate to="/" replace />;
  }

  return children;
}