// context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // null means no user is logged in

  const login = (userData) => {
    setUser(userData); // Set user data on successful login
  };

  const logout = () => {
    setUser(null); // Remove user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
