import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "@/services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loading, setLoading] =
    useState(true);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
  };

  const loadUser = async () => {
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const data =
      await getCurrentUser(token);

    setUser(data.user);
  } catch (error) {
    logout();
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadUser();
}, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
