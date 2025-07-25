

import  User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import  { createAccessToken } from "../libs/jwt.js"
import jwt from 'jsonwebtoken';

export const register = async (req, res) =>  {
    const {username, email , password} = req.body;

    try {
       
        const userFound = await User.findOne({email});
        if(userFound) return res.status(400).json(['the email is already in use']);

       const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({username, email, password: passwordHash});

        const userSaved = await user.save();

        const token = await createAccessToken({_id: userSaved._id});

         res.cookie('token', token, {
    httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
           
         })
           
    res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt

    }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});   
    
    }

} ;


export const login = async (req, res) =>  {
    const {email , password} = req.body;

    try {
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({error: 'User not found'});

       const isMatch = await bcrypt.compare(password, userFound.password);
       if(!isMatch) return res.status(400).json({error: 'Invalid credentials'});

       
        // con el usuario encontrado creamos el token
        const token = await createAccessToken({_id: userFound._id});

        res.cookie('token', token, {
         httpOnly: true,
         secure: false,         // <--- IMPORTANTE: en desarrollo debe ser false
        sameSite: "lax",       // <--- lax es más permisivo para localhost
});
           
    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt

    }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});   
    
    }

} ;


export const logout = (req, res) =>  {
    res.cookie('token', '', {expires: new Date(0)}); // borramos el token
    res.sendStatus(200);
}


export const profile = async (req, res) =>  {

    //buscamos al usuario 
   const userFound = await User.findById(req.user._id)

 if (!userFound)  return res.status(400).json({error: 'User not found'});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}


export const verifyToken = async (req, res) =>  {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
        if(err) return res.status(403).json({message: "invalid token"});
      
        const userFound = await User.findById(user._id)
        if (!userFound)  return res.status(400).json({error: 'User not found'});
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    })
}