import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// función para registrar un usuario
export const register = async (req, res) => { 
    // obtiene los datos del body
    const { email, password, username } = req.body;
    // busca si el email ya está registrado
    const userFound = await User.findOne({ email });
    // si el email ya está registrado, devuelve un mensaje de error
    if (userFound) {
        return res.status(400).json({ message: "The email is already in use" });
    }
    // busca si el username ya está registrado
    const usernameFound = await User.findOne({ username });
    // si el username ya está registrado, devuelve un mensaje de error
    if (usernameFound) {
        return res.status(400).json({ message: "The username is already in use" });
    }

    
    try {
        // encripta la contraseña
        const passwordHash = await bcrypt.hash(password, 10)
        // crea un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
        // guarda el nuevo usuario en la base de datos
        const userSaved = await newUser.save();
        // crea el token de acceso
        const token = await createAccessToken({id: userSaved._id})
        // retorna el usuario y el token
        res.cookie( 'token', token )
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req, res) => { 
    // obtiene los datos del body
    const {email, password} = req.body;

    try {
        // busca el usuario por su email
        const userFound = await User.findOne({ email });
        // si el usuario no existe, devuelve un mensaje de error
        if (!userFound) return res.status(400).json({message:"User not found"});
        // compara la contraseña ingresada con la contraseña encriptada
        const isMatch = await bcrypt.compare(password, userFound.password);
        // si la contraseña no coincide, devuelve un mensaje de error
        if (!isMatch) return res.status(400).json({message: "incorrect password"})
        // crea el token de acceso
        const token = await createAccessToken({id: userFound._id});
        // retorna el usuario y el token
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
// Función para cerrar sesión
export const logout = async (req, res) => {
    // elimina la cookie del token de acceso
    res.cookie('token',"",{
    expires: new Date(0)
});
return res.sendStatus(200);
}

// Función para obtener el perfil del usuario
export const profile = async (req, res) => {
    // busca el usuario por su id
    const userFound = await User.findById(req.user.id)
    // si el usuario no existe, devuelve un mensaje de error
    if (!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}
// función para verificar el token de acceso	
export const verifyToken = async (req, res) => {
    const {token} = req.cookies;
    // si no hay token, devuelve un mensaje de error    
    if (!token) return res.status(401).json({message: "Unauthorized"});
    // verifica el token
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({message: "Unauthorized"});
        // busca el usuario por su id
        const userFound = await User.findById(user.id);
        // si el usuario no existe, devuelve un mensaje de error    
        if (!userFound) return res.status(401).json({message: "Unauthorized"});
        // retorna el usuario
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })

}
