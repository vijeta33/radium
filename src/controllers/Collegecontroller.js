
const CollegeModel = require('../models/CollegeModels')
const InternModel = require('../models/InternModels')

//ISVALID   REQUESTBODY FUNCTION
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
//  ISVALID   FUNCTION
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
// ---------------------FIRST API REGISTER COLLEGE
const registercollege = async function (req, res) {
    try {
        const requestBody = req.body;
        console.log(requestBody)
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college details' })
            return
        }
        // EXTRACT PARAMS
        const { name, fullName, logoLink } = requestBody;

        // VALIDATION
        if (!name) {
            res.status(400).send({ status: false, message: 'name is required' })
            return
        }
        if (!fullName) {
            res.status(400).send({ status: false, message: 'fullName is required' })
            return
        }
        if (!logoLink) {
            res.status(400).send({ status: false, message: 'logoLink is required' })
            return
        }
        // AFTER VALIDATION CREATE COLLEGE DATA

        const collegeData = { name, fullName, logoLink }
        const newcollege = await CollegeModel.create(collegeData);

        return res.status(201).send({ status: true, message: `college created successfully`, data: newcollege });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }

}
module.exports.registercollege = registercollege



//----------------SECOND API CREATE INTERN 
const createintern = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide intern details' })
            return
        }
        //  EXTRACT PARAMS
        const { name, email, mobile, collegeName } = requestBody;

        //  VALIDATION
        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'Intern name is required' })
            return
        }
        if (!isValid(email)) {
            res.status(400).send({ status: false, message: 'Intern email is required' })
            return
        }
        const isEmailAlreadyUsed = await InternModel.findOne({ email })
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: "Email is already used, try different one" })
            return
        }
        if (!isValid(mobile)) {
            res.status(400).send({ status: false, message: 'Intern mobile is required' })
            return
        }
        const ismobileAlreadyUsed = await InternModel.findOne({mobile })
            if (ismobileAlreadyUsed) {
                res.status(400).send({ status: false, message: "mobile is already used, try different one" })
                return
        }



        if (!isValid(collegeName)) {
            res.status(400).send({ status: false, message: '  intern College name is required' })
            return
        }
        // FIND COLLEGE NAME IN COLLEGE MODEL
        const collegenameDetails = await CollegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegenameDetails) {
            res.status(404).send({ status: false, message: "No college exist with this name" })
            return
        }
        // COLLEGEID===COLLEGENAME
        const collegeId = collegenameDetails["_id"]

        // EXTRACT INTERN PARAMS
        const interndata = { name, email, mobile, collegeId };
        // CREATE INTERN DATA
        const newIntern = await InternModel.create(interndata)
        res.status(201).send({ status: true, message: 'New Intern created successfully', data: newIntern })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}
module.exports.createintern = createintern
// module learn


//------------------GET ALL INTERN DETAIL BY COLLEGE NAME

const alldetails = async function (req, res) {
    try {
        let tempcolgName = req.query.collegeName
        console.log(tempcolgName, "h1")
        if (!tempcolgName) {
            res.status(400).send({ status: false, err: "College Name is required" })

        }
        //let colgName = tempcolgName.toLowerCase()
        // promise -- callback
        let temp = await CollegeModel.findOne({ name: req.query.collegeName })
        
        if (!temp) {
            res.status(400).send({ status: false, err: "Invalid parameters: Provide a valid college anabbreviation" })
        }
        else {
            let ID = temp._id
            let data = temp
            let interns = await InternModel.find({ collegeId: ID }).select({ _id: 1, name: 1,email:1, mobile: 1 })

            if (!interns) {
                res.status(200).send({ status: true, msg: "No Interns applied for an internship" })
            }

            else {

                let details = { name: data.name, fullname: data.fullName, logolink: data.logoLink, interests: interns}


                res.status(200).send({ status: true, Details: details })
            }

        }
    }

    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}

module.exports.alldetails = alldetails

 
