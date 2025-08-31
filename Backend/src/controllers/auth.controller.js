const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Enable secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax", 
    maxAge: 1000 * 60 * 60 * 24, 
    path: "/",
};

async function registerUser(req,res){
    const {username, email, password} = req.body

    if(!username || !email || !password) {
        return res
        .status(400)
        .json({success: false,message: "Username, Email and Password are required"})
    }

    const isUserExists = await User.findOne({ 
        $or: [
            { username: username },
            { email: email }
        ]
    })
    if(isUserExists) return res.status(409).json({success: false,message: "Username already in use"})

    const user = await User.create({
        username: username,
        email: email, 
        password: await bcrypt.hash(password,10)
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

    res.cookie("user",token, cookieOptions)

    const {password: _, ...userWithoutPassword} = user.toObject()

    res.status(201).json({
        success: true,
        message: "User is successfully registered",
        userWithoutPassword
    })
}

async function loginUser(req,res){
    const {usernameOrEmail, password} = req.body

    const isUserExists = await User.findOne({ 
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    })
    if(!isUserExists) return res.status(400).json({ success:false,message:"User not found"})
    
    const isPasswordValid = await bcrypt.compare(password,isUserExists.password)
    if(!isPasswordValid) return res.status(400).json({success:false,message:"Password is invalid.!"})

    const token = jwt.sign({id:isUserExists._id},process.env.JWT_SECRET)

    res.cookie("user",token, cookieOptions)
    
    const {password: _, ...userWithoutPassword} = isUserExists.toObject()

    return res
    .status(200)
    .json({
        success: true,
        message: `${isUserExists.username} is successfully logined.!`,
        user: userWithoutPassword
    })
}

async function currentUser(req,res){
    const user = req.user

    return res
    .status(200)
    .json({
        success: true,
        message: "User details :-",
        user
    })
}

async function logoutUser(req,res){
    res.clearCookie("user", cookieOptions)
    
    res
    .status(200)
    .json({
        success: true,
        message: "User logout successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    logoutUser
}
