const express=require('express');
const routerUser=express.Router();
const {signUp,signIn}=require('../controllers/user.controllers')

routerUser.post('/signup',signUp)
routerUser.post('/signin',signIn)

module.exports=routerUser