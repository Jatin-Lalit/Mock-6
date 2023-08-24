const express=require("express");
const {UserModel}=require("../model/user.model");
const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist.js");
const bcrypt = require("bcryptjs");

const userrouter=express.Router();
userrouter.use(express.json());


userrouter.post("/register",async(req,res)=>{
   
    try{
        const {username,avatar,email,password} =req.body;
        const isPresent=await UserModel.findOne({email});
       
        if(isPresent){
            res.send("Already Register");
        }else{
     bcrypt.hash(password,5,async(err,hash_pass)=>{
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
           
          }else{
            let user=new UserModel({username,avatar,email,password:hash_pass});
            await user.save();
            res.send("Registration Completed")
          }
        
     })
        }
    }catch(err){
        console.log(err)
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await UserModel.findOne({email});
        
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (result) {
                res.status(200).send({
                  msg: "login success",
                  token: jwt.sign({ userId: user._id }, "jatin", {
                    expiresIn: "100000m"
                  }),
                  
                });
              }
            });
          }
        }catch(err){
        console.log(err.massage)
    }
})



userrouter.get("/logout",(req,res)=>{
    try{

     const token=req.headers.authorization
     blacklist.push(token);
     res.send("you are loged out")
    }catch(err){
        console.log(err.massage)
    }
})





module.exports={
    userrouter
}