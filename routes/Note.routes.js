const express=require("express")
const {NoteModel}=require("../model/Note.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find()

    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note=new NoteModel(payload)
    await note.save()
   // res.send("All the notes created")
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const noteId=req.params.id
    const payload=req.body
    const note=await NoteModel.findOne({"id":id})
    const userID_in_note=note.UserID
    const userID_making_req=req.body.userID
    try {
        if(userID_in_note!==userID_making_req){
            res.send("you are not authorized")
        }
        else {
            await NoteModel.findByIdAndUpdate({_id:noteId},payload)
            res.send ("Updated")
        }
        
    } catch (error) {
        console.log(error)
    }
   

   // res.send("Deleted")
})



noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteId=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID})

    res.send("Deleted")
})


module.exports={
    noteRouter
}