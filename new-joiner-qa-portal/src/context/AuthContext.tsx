import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";

type Role = "manager" | "new-joiner" | null;

interface AuthContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const router = useRouter();

  const login = (selectedRole: Role) => {
    setRole(selectedRole);
    if (selectedRole === "manager") router.push("/manager");
    else if (selectedRole === "new-joiner") router.push("/new-joiner");
  };

  const logout = () => {
    setRole(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};