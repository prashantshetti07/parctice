const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://prashant:prashant@cluster0.vwjqzdt.mongodb.net/notespsc?retryWrites=true&w=majority")

module.exports={
    connection
}