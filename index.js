const express=require("express");
const{connect}=require("./db");
const app=express();
const cors=require("cors");
const {userrouter}=require("./router/user.router")
const {auth}=require("./middleware/auth")
const{blogRouter}=require("./router/blog.router") 

/////////////////////////
app.use(express.json());
app.use(cors());
app.use("/api",userrouter)
app.use(auth);
app.use("/api",blogRouter)

///////////////////////////
app.listen(5152,async()=>{
    try{
        await connect;
        console.log("connected to DB");
    }catch(err){

        console.log(err.message);
    }

    console.log("Server is UP!")
});