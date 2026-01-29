import { Navigate, Outlet } from "react-router-dom";
import type { AuthResponse } from "../features/auth/auth.types";


type AuthGuardProps = {
  roles?: string[]
}
export const getUserStorage = (): AuthResponse | null => {
  let user = window.localStorage.getItem("user");
  if (user) {
    return user ? JSON.parse(user) : null;
  }
  return null;
}

const extractRole = (user: any): string | null => {
  if (!user) return null;

  if (typeof user.role === "string") return user.role;

  if (user.role?.authority) return user.role.authority;

  if (Array.isArray(user.roles)) return user.roles[0];

  return null;
};

export const AuthGuard = ({ roles }: AuthGuardProps) => {
  const user = getUserStorage();

  const role = extractRole(user);

  if (!user?.role) {
    return <Navigate to="/signIn" replace />;
  }

  if (roles && !roles.includes(role || "")) {
    return <Navigate to="/signIn" replace />;
  }

  return <Outlet />;
};

