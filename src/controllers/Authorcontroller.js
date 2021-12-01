const jwt = require('jsonwebtoken')
const AuthorModel = require('../models/AuthorModel')

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        const email = req.body.email
        const regx = (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)
        if (regx.test(email)) {
            let savedauthor = await AuthorModel.create(author)
            res.send({ msg: savedauthor })
        }
        else {
            res.send({ msg: "enter the valid email" })
        }
    }
    catch (err) {
        res.status(400).send({ msg: "Some error occured" });
    }
}


module.exports.createAuthor = createAuthor
