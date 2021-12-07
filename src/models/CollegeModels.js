const mongoose = require('mongoose')


var validateEmail = function (email) {
   var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
   return re.test(email)
};

const collegeSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true, trim: true},
   fullName: { type: String, required: true, trim: true },
   logoLink: { type: String, required: true, trim: true },
   isDeleted: { type: Boolean, default: false }
}
   , { timestamps: true })


module.exports = mongoose.model('College', collegeSchema)


