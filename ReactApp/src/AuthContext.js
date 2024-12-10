import React, { createContext, useContext, useState } from 'react';

// TODO 1:  Create a context for authentication
// This line creates a new Context object named `AuthContext`. 
// This object comes with two components: a `Provider` and a `Consumer`.
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // State to hold the authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  // Function to log in the user
  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };
  // Function to log out the user
  const logout = () => setIsAuthenticated(false);


  return (
    // Provide the authentication state and functions to the component tree
    // The `Provider` component is used to wrap the part of your application 
    // where you want the context to be available. 
    // It accepts a `value` prop, which will be passed to any components that consume this context.
    // 'children' are the renderable content that this component will surround
    

    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);


