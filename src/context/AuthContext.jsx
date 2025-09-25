import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  authToken: null,
  user: null,
  isAuthenticated: false,
  loading: true,
  setAuthToken: null,
  setUser: null,
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [loading, setLoading] = useState(true);

  // if ( authToken || user ) {
  //   setLoading(false);
  // }

  return (
    <AuthContext.Provider
      value={{
        authToken: authToken,
        user,
        isAuthenticated: !!authToken,
        loading,
        setAuthToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
