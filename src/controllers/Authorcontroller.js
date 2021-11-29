
const jwt = require('jsonwebtoken')
const AuthorModel = require('../models/AuthorModel')



const createAuthor = async function(req,res){
    let author = req.body
    let savedauthor = await AuthorModel.create(author)
    res.send({msg: savedauthor})
}




module.exports.createAuthor = createAuthor
