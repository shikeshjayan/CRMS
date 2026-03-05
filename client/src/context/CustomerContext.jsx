import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_CUSTOMERS_URL, {
        withCredentials: true,
      });

      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

      setCustomers(data);
    } catch (err) {
      console.error("Failed to fetch customers");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <CustomerContext.Provider value={{ customers, setCustomers, loading, fetchCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
