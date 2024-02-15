import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// función para validar el token
export const authRequired = (req, res, next) => {
    // obtiene el token de las cookies
    const { token } = req.cookies;
    // si no hay token, devuelve un mensaje de error
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
    // verifica el token y lo decodifica para obtener el usuario 
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        // si el token es válido, pasa al siguiente middleware
        next();
    })
}

