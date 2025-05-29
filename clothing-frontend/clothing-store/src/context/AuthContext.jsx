import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  token: null,
  login: (token) => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);


  // внутри AuthProvider
    useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
        setToken(t);
        axios.defaults.headers.common.Authorization = `Bearer ${t}`;
    }
    }, []);

    const login = (t) => {
        localStorage.setItem("token", t);
        axios.defaults.headers.common.Authorization = `Bearer ${t}`;
        setToken(t);
    };


  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
