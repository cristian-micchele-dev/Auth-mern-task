
import jwt from 'jsonwebtoken';
export const authRequired = (req, res, next) => {

    const {token} = req.cookies
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    // verificamos el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "invalid token"});
        req.user = user; // user es el payload
         next();
    })

   
}
