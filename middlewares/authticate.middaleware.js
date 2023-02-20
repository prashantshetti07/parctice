const jwt=require("jsonwebtoken")

const authticate=(req,res,next)=>{
    const token=req.header.authorization
    if(token){
        jwt.verify(token,"masai",(err,decode)=>{
            if(decode){
                req.body.userID=decode.userID
                next()
            }
            else {
                res.send("Please login")
            }
        })
    }
    else {
        res.send("Please login")
    }
}

module.exports={
    authticate
}