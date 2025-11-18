import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface AuthContextType {
  employeeID: number | null;
  isAdmin: boolean;
  handleLogin: (id: number, admin: boolean) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}) {
  const [employeeID, setEmployeeID] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Load saved login on app start
  useEffect(() => {
    const employeeIDString = localStorage.getItem("employeeID");
    const isAdminString = localStorage.getItem("isAdmin");

    if (employeeIDString!=null){
        setEmployeeID(Number(employeeIDString));
    }
    if (isAdminString){
        setIsAdmin(JSON.parse(isAdminString));
    }
  }, []);

  const handleLogin = (id: number, admin: boolean) => {
    localStorage.setItem("employeeID", String(id));
    localStorage.setItem("isAdmin", String(admin));
    setEmployeeID(id);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeID");
    localStorage.removeItem("isAdmin");
    setEmployeeID(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ employeeID, isAdmin, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}