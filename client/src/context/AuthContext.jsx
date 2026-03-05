import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const checkAuth = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_CHECKUSER_URL, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_LOGIN_URL,
        credentials,
        {
          withCredentials: true,
        },
      );

      setUser(res.data.user);
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_LOGOUT_URL,
        {},
        { withCredentials: true },
      );
    } catch {}

    setUser(null);
  };

  const signup = async (data) => {
    try {
      const res = await axios.post(import.meta.env.VITE_SIGNUP_URL, data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Signup failed";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser: checkAuth, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
