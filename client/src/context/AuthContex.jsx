import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
        }
    }

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get()

            // Comprueba si hay un token en las cookies
            if(!cookies.token) {
                // Si no hay un token, se establece isAuthenticated en false y se detiene el loading y se establece el usuario en null
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return
            }

                try {
                    // Si hay un token, se verifica si es válido en el backend
                    const res = await verifyTokenRequest(cookies.token);
                    // Si no recibe una respuesta del backend el token no es valido
                    if(!res.data) {
                        setIsAuthenticated(false);
                        setLoading(false);
                        setUser(null);
                        return;
                    }
                    // si es valido, se establece isAuthenticated en true, se detiene el loading y se establece el usuario
                    setIsAuthenticated(true);
                    setUser(res.data);
                    setLoading(false);
                } catch (error) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    setUser(null);
                }
        
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            loading,
            user,
            isAuthenticated,
            errors,

        }}>
            {children}
        </AuthContext.Provider>
    )
}