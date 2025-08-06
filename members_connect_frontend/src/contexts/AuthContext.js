import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const backendUrl = "https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001";

const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (token) {
      axios
        .get(`${backendUrl}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("jwtToken");
        });
    }
  }, [token]);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/login`, { email, password });
      setToken(data.access_token || data.token);
      localStorage.setItem("jwtToken", data.access_token || data.token);
      return true;
    } catch (err) {
      return false;
    }
  };

  // PUBLIC_INTERFACE
  const register = async (form) => {
    try {
      await axios.post(`${backendUrl}/auth/register`, form);
      return true;
    } catch {
      return false;
    }
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwtToken");
  };

  const value = { user, token, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
