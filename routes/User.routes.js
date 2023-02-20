const express=require("express")
const UserModel=require("../model/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const useRouter=express.Router()

useRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body

    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err) res.send({"msg":"somthing went wrong","error":err.message})
            else {
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.send("user has been register")
            }
        })
      
    } catch (error) {
        res.send({"err":error.message})
    }
   

})

useRouter.post("/login",async(req,res)=>{
    const {email}=req.body

    try {
        const user= await UserModel.find({email})

        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"login sucessfully","token":token})
                }
                else{
                         res.send({"error":err.message})
                }
            })
          
        }
        else{
            res.send({"msg":"wrong crondential"})
        }
    } catch (error) {
        console.log({"error":error.message})
    }
  

})

module.exports={
    useRouter
}