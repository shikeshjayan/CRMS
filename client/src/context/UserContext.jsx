import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_USER_URL, {
        withCredentials: true,
      });

      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setUserData(data);
    } catch (err) {
      console.error("Failed to fetch customers");
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
