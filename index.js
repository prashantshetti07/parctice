const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {noteRouter}=require("./routes/Note.routes")
const {authenticate}=require("./middlewares/authticate.middaleware")
const cors=require("cors")



const app=express()

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at port 8080")
})