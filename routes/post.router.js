const express = require('express');
const { postModel } = require('../model/post.model');

const postRoute = express.Router();


postRoute.get("/",async(req,res)=>{
    try{
        const post = await postModel.find();
        res.status(200).send(200); 
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})


postRoute.post("/add",async(req,res)=>{
    const {title,about}=req.body
    try{
        let post = new postModel({title,about});
        await post.save();
        res.status(200).send({"postAdded":post})
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
})


// postRoute.patch("/update/:id",async(req,res)=>{
//     try{
//         postModel.findByIdAndUpdate({_id:id},req.body);
        
//     }
//     catch(e){

//     }
// })




module.exports={postRoute}