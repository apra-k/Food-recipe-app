const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

async function signUp(req,res){
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message: "Email and password fields are required"})
        }
        const isExist=await userModel.findOne({email})
        if(isExist){
            return res.status(400).json({message: "User already exists, choose a different email id"})
        }
        const hashpassword=await bcrypt.hash(password,10)
        const user=await userModel.create({
            email,password:hashpassword
        })
        const token=jwt.sign({
            id: user._id
        },process.env.JWT_KEY)

        return res.status(201).json({
            message: "User created",
            email,
            token
        })
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

async function signIn(req,res){

    try{

        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"Email and password fields are required"})
        }

        const doesUserExist=await userModel.findOne({email})
        if(!doesUserExist){
            return res.status(400).json({message: "Email not found"})
        }
        
        const isCorrectPswd=await bcrypt.compare(password,doesUserExist.password) //1st arg is password in req.body and 2nd arg is password stored in db(stored in hashed form, but bcrypt.compare can compare both without converting hash password back to original) of user who is found by email
        if(isCorrectPswd){
            const token=jwt.sign({
                id: doesUserExist._id
            },process.env.JWT_KEY)
            
            return res.status(200).json({
                message: "User logged in",
                email,
                token        
            })  
        }else{
            return res.status(401).json({message: "Wrong password"})
        }
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

module.exports={signUp,signIn}

