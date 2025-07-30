
import jwt from 'jsonwebtoken';
export const authRequired = (req, res, next) => {
    // Primero intentar obtener el token de las cookies
    let token = req.cookies.token;
    
    // Si no hay token en cookies, intentar obtenerlo del header Authorization
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    // verificamos el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "invalid token"});
        req.user = user;
        next();
    })
}
