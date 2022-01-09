const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'UserQuora', 
        required: true
    },
    text: {
        type:String,
        required:true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref :'question',
        required: true
    }, 
}, { timestamps: true })

module.exports = mongoose.model('answers', answerSchema)


