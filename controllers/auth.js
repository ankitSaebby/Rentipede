import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */

export const register = async(res,req) => {
    try {
        const {
            name,
            password,
            email,
            phone,
            picturePath,
            likedPost,
            location
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            password : passwordHash,
            email,
            phone,
            picturePath,
            likedPost,
            location,
            profileViewed : Math.floor(Math.random()*10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

/* Login Registered user */

export const login = async(req, res) =>{
    try{
        const{ email, password } = req.body;
        const user = await User.findOne({ email : email })
        if(!user) return res.status(400).json({ msg : "User not found. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials. "});

        const token = jwt.sign({ id : user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token , user});
    }
    catch(err){
        res.status(500).json({ error : err.message });
    }
}