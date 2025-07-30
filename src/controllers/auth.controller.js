

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

        // Configuración unificada para cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });
           
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
            token // También enviar el token en la respuesta
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});   
    }
};

export const login = async (req, res) =>  {
    const {email , password} = req.body;

    try {
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({error: 'User not found'});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({error: 'Invalid credentials'});

        const token = await createAccessToken({_id: userFound._id});

        // Configuración específica para producción en Render
        const cookieOptions = {
            httpOnly: true,
            secure: true, // Siempre true en producción HTTPS
            sameSite: 'none', // Necesario para cross-origin en producción
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
            domain: '.onrender.com' // Dominio específico para Render
        };
        
        // En desarrollo, usar configuración diferente
        if (process.env.NODE_ENV !== 'production') {
            cookieOptions.secure = false;
            cookieOptions.sameSite = 'lax';
            delete cookieOptions.domain;
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true en producción
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });
           
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token // También enviar el token en la respuesta
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});   
    }
};

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


export const verifyToken = async (req, res) => {
    // Como ya pasó por authRequired, req.user ya está disponible
    try {
        const userFound = await User.findById(req.user._id);
        if (!userFound) return res.status(400).json({error: 'User not found'});
        
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}
