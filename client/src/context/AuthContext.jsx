import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { logoutRequest } from "../api/auth";




export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };


  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if(Array .isArray(error.response.data)){
        return setError(error.response.data);
      }
      setError([error.response.data.message]);
     
    }

  }; 
const logout = async () => {
  try {
    await logoutRequest(); // ✅ llama al backend para borrar la cookie
    setUser(null);
    setIsAuthenticated(false);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

useEffect(() => {
  if (errors.length > 0) {
    const timer = setTimeout(() => {
      setError([]);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [errors]);

useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await verifyTokenRequest();
      console.log("Respuesta de verifyTokenRequest:", res);
      if (!res.data) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(res.data);
      }
    } catch (error) {
      console.log("Error en verifyTokenRequest:", error.response?.data || error.message);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  checkLogin();
}, []);

  return (
    <AuthContext.Provider value={{ singup, user, isAuthenticated, errors, signin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
