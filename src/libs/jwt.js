import {TOKEN_SECRET} from '../config.js';
import jwt from 'jsonwebtoken';
// funcion para crear el token de acceso
export const createAccessToken = (payload) => {
    return  new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
            );
    })
}
