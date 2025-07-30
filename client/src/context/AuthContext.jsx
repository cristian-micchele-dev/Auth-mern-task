import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
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
      
      // Guardar token en localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
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
      console.log('Login response:', res);
      
      // Guardar token en localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      setUser(res.data);
      setIsAuthenticated(true);
      setError([]); // Limpiar errores en login exitoso
    } catch (error) {
      console.log('Login error:', error);
      
      // Mejorar el manejo de errores
      if (error.response?.data) {
        if (Array.isArray(error.response.data)) {
          setError(error.response.data);
        } else if (error.response.data.error) {
          setError([error.response.data.error]);
        } else if (error.response.data.message) {
          setError([error.response.data.message]);
        } else {
          setError(['Error de autenticación']);
        }
      } else {
        setError(['Error de conexión con el servidor']);
      }
    }
  }; 

  const logout = async () => {
    try {
      await logoutRequest();
      localStorage.removeItem('token'); // Limpiar localStorage
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      // Limpiar localStorage aunque falle la petición
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
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
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await verifyTokenRequest();
        console.log("Respuesta de verifyTokenRequest:", res);
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('token');
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        console.log("Error en verifyTokenRequest:", error);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
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
