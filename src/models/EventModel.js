const mongoose=require('mongoose')

const EventSchema=new mongoose.Schema({
    
    text:String,
    dateTime:Date.now()

}, {timestamps: true} )



module.exports=mongoose.model("Event",EventSchema)
