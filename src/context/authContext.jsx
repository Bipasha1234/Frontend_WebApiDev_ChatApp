// // // context/AuthContext.jsx
// // import React, { createContext, useContext, useState } from "react";

// // // Create the context
// // const AuthContext = createContext();

// // // Custom hook to use the AuthContext
// // export const useAuth = () => useContext(AuthContext);

// // // Provider component
// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);  // null means no user is logged in

// //   const login = (userData) => {
// //     setUser(userData); // Set user data on successful login
// //   };

// //   const logout = () => {
// //     setUser(null); // Remove user data on logout
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };



// // import React, { createContext, useContext, useEffect, useState } from "react";

// // // Create the context
// // const AuthContext = createContext();

// // // Custom hook to use the AuthContext
// // export const useAuth = () => useContext(AuthContext);

// // // Provider component
// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);  // null means no user is logged in

// //   // Check if there's a token in localStorage on component mount
// //   useEffect(() => {
// //     const storedToken = localStorage.getItem("token");
// //     if (storedToken) {
// //       setUser({ token: storedToken });  // Set the user with the stored token
// //     }
// //   }, []);

// //   const login = (userData) => {
// //     setUser(userData);  // Set user data on successful login
// //     // Store the token in localStorage
// //     localStorage.setItem("token", userData.token);
// //   };

// //   const logout = () => {
// //     setUser(null);  // Remove user data on logout
// //     // Remove the token from localStorage
// //     localStorage.removeItem("token");
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };



// // authContext.jsx
// // import { createContext, useContext, useState } from 'react';

// // const AuthContext = createContext();

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [token, setToken] = useState(localStorage.getItem("token"));

// //   const login = (token, user) => {
// //     setUser(user);  // Set the user object with user.id and other info
// //     setToken(token);  // Set the token
// //     localStorage.setItem("token", token);  // Store token in local storage
// //     localStorage.setItem("user", JSON.stringify(user));  // Store user info in local storage
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     setToken(null);
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, token, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from "react";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider to wrap the app
// export const AuthProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(null); // Manage the logged-in user

//   // Mock login and logout functions
//   const login = (user) => setAuthUser(user);
//   const logout = () => setAuthUser(null);

//   return (
//     <AuthContext.Provider value={{ authUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
