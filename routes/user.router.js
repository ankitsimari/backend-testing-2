const express = require('express');
const { userModel } = require('../model/user.model');
const bcrypt = require('bcrypt')
const userRouter = express.Router();


userRouter.post("/register",async(req,res)=>{
    const {email,password,name} = req.body
    try{
        let already = await userModel.findOne({email});
        if(already){
            res.status(200).send("user_already_registered")
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                // Store hash in your password DB.
                if(hash){
                    const user = new userModel({name,email,password:hash});
                    await user.save();
                    res.status(200).send({"user_Added":user})
                }else{
                    res.send("password not hashed")
                }
            });
        }
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        let user = await userModel.findOne({email});
        if(user){
            console.log(user.password,password)
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == true
                if(result){
                    res.status(200).send({"success":user})
                }else{
                    res.status(200).send("wrongPassword")
                }
            });
        }else{
            res.status(200).send("WrongEmail")
        }
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})

userRouter.get("/",async(req,res)=>{
    try{
        let user = await userModel.find();
        res.status(200).send(user)
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})


module.exports={userRouter}