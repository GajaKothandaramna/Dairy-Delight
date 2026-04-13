import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";


type Role = "ADMIN" | "USER";

interface AuthContextType {
  isLoggedIn: boolean;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  // hydrate from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [role, setRole] = useState<Role | null>(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole === "ADMIN" || storedRole === "USER"
      ? storedRole
      : null;
  });

  // persist changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [isLoggedIn, role]);

  const login = (userRole: Role) => {
    setIsLoggedIn(true);
    setRole(userRole);
    //navigate("/home");
     if (userRole === "ADMIN")
     {
        navigate("/admin");
     }
     else
     {
      navigate("/");
     }
};
  

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
