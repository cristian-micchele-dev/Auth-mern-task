
import jwt from 'jsonwebtoken';
export const authRequired = (req, res, next) => {
    let token = null;
    
    // Primero intentar obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
    }
    
    // Si no hay token en header, intentar obtenerlo de las cookies
    if (!token) {
        token = req.cookies.token;
    }
    
    console.log('🔍 Auth Debug:');
    console.log('- Authorization header:', authHeader ? 'Present' : 'Not present');
    console.log('- Token found:', token ? 'YES' : 'NO');
    console.log('- Cookies received:', Object.keys(req.cookies));
    
    if(!token) {
        console.log('❌ No token provided');
        return res.status(401).json({error: 'Unauthorized'});
    }

    // verificamos el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            console.log('❌ Token verification error:', err.message);
            return res.status(403).json({message: "invalid token"});
        }
        console.log('✅ Token verified for user:', user._id);
        req.user = user;
        next();
    })
}
