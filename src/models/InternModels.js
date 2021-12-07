const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)};

const internSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
     },
    mobile:{
        trim: true,
        type: String,
        required:true,
        unique: true,
         validate: {
            validator: function (mobile) {
             return  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile)
            }, message:'Please fill a valid mobile number', isAsync:false
         }
    },
   
    collegeId: { type: ObjectId, refs: 'College'},
    isDeleted: { type: Boolean, default: false }
}
    ,
    { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)

