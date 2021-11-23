const userModel= require("../models/userModel.js")



const createUser= async function (req, res) {
    let userDetails = req.body
    let appType = req.headers['isfreeapp']
     let userType
     if(appType === 'false') {
         userType = false
     } else {
         userType = true
     }

    userDetails.freeAppUser = userType
    let userCreated = await userModel.create(userDetails)
    res.send({data: userCreated})
}

module.exports.createUser = createUser
