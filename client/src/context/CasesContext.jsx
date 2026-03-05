import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CasesContext = createContext();

const CasesProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_CASES_URL, {
        withCredentials: true,
      });

      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

      setCases(data);
    } catch (err) {
      console.error("Failed to fetch customers");
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <CasesContext.Provider value={{ cases, setCases, loading, fetchCases }}>
      {children}
    </CasesContext.Provider>
  );
};

export default CasesProvider;
