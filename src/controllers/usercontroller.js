const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ObjectId = require('mongoose').Types.ObjectId;

const createUser = async function (req, res){
    try{
       let userBody = req.body
       let {fname, lname,email,phone,password,creditScore} = userBody
       const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)
       const userdata = {fname,lname,email,phone,password,creditScore}
       const createddata = await userModel.create(userdata)
       return res.status(201).send({status: true, message: 'success' , data : createddata})

    } catch(err){
        res.status(500).send({status: false , message: err.message})
    }
}


const userLogin = async (req, res) => {
    try {
        const myEmail = req.body.email
        const myPassword = req.body.password
    
        let user = await userModel.findOne({ email: myEmail });
        if (user) {
            const { _id, fname, lname, password} = user
            const validPassword = await bcrypt.compare(myPassword, password);
            if (!validPassword) {
                return res.status(400).send({ message: "Invalid Password" })
            }
            let payload = { userId: _id, email: myEmail };
            const generatedToken = jwt.sign(payload, "Quora", { expiresIn: '10080m' });
            res.header('authorization', generatedToken);
            return res.status(200).send({
                Message: fname + " " + lname + " you have logged in Succesfully",
                userId: user._id,
                token: generatedToken,
                //iat: Math.floor(Date.now() / 1000),
                //exp: Math.floor(Date.now() / 1000) + 100 * 60 * 60 ,
            });
        } else {
            return res.status(400).send({ status: false, message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const getuserById = async (req, res) => {
    try {
        const userId = req.params.userId
        let checkId = ObjectId.isValid(userId);
        if (!checkId) {
            return res.status(400).send({ status: false, message: "Please Provide a valid userId in query params" });;
        }
        const searchprofile = await userModel.findOne({ _id: userId })
        if (!searchprofile) {
            return res.status(404).send({ status: false, message: 'profile does not exist' })
        }
         res.status(200).send({ status: true, message: 'user profile details', data: searchprofile })
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId
        let checkId = ObjectId.isValid(userId);
        if (!checkId) {
            return res.status(400).send({ status: false, message: "Please Provide a valid userId in query params" });;
        }
        let userBody = req.body
        let { fname, lname, email, phone} = userBody
        let updateProfile = await userModel.findOneAndUpdate({ _id: userId }, { fname: fname, lname: lname, email: email, phone: phone}, { new: true })
        res.status(200).send({ status: true, message: "user profile updated successfully", data: updateProfile })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports ={ createUser , userLogin, getuserById, updateProfile}









