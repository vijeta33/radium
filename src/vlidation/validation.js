const jwt = require("jsonwebtoken");

const validation = async function (req, res, next) {
    let token = req.headers['x-api-key'];
    let validate = jwt.verify(token, "radium");
    console.log(validate.id)
    console.log(req.query.id)
    if (validate) {
        if (validate._id == req.query.id) {
            next();
        }
        else {
            res.send({ status: "false", msg: "User not Authorized" });
        }
    }
    else {
        res.status(200).send({ status: "false", msg: "Token is invalid" });
    }
}
module.exports.validation = validation;