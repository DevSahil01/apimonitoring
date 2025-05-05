import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import authUtil from './config.js'

const userRouter = express.Router();


userRouter.post('/register', async (req, res) => {
    const { username, name, email, password } = req.body;
   
    
    try {
 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const registerUser = new User({
            username,
            name,
            email,
            password 
        });

        await registerUser.save();
        
        res.status(201).json({ 
            message: "User registered successfully",
            apiKey: registerUser.apiKey 
        });
    } catch (e) {
        console.error("Registration error:", e);
        res.status(500).json({ error: "Error while registering user" });
    }
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

     
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

       
        const authToken = authUtil.generateToken(user._id);
        
        res.cookie('authToken', authToken, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.json({
            message: "User logged in successfully",
            status: 200,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                apiKey: user.apiKey
            }
        });
    } catch (e) {
        console.error("Login error:", e);
        res.status(500).json({ error: "Error during login" });
    }
});

export default userRouter;