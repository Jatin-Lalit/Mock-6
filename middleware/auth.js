const jwt=require("jsonwebtoken");
 const {blacklist} = require("../blacklist.js");
const {UserModel}=require("../model/user.model");
const auth=async (req,res,next)=>{
const token=req.headers.authorization
try{
    if(blacklist.includes(token)){
  res.send("Unauthorized")
    }
   else { if(token){
        const decoded= jwt.verify(token,"jatin")
        if(decoded){
            const {userId}=decoded;
            
        const user = await UserModel.findOne({_id:userId})
       
        req.body.userId=userId
       
         next();
        }else{
         res.send("please login first")
        }
     }else{
         res.send("No Token Found")
     }
    }
}catch(err){
console.log(err)
}

}
module.exports={
    auth 
}