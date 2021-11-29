const BlogModel = require('../models/BlogModels')


const myBlogCreation = async function (req, res) {
    try {
        let data = req.body;
        let authorId = req.body.authorId;//     Assigned the auther id in variable to check it is valid or not
        let validId = await AuthorModel.findById(authorId);
        if (validId) {
            let savedData = await BlogModel.create(data)
            res.status(201).send({ data: savedData });
        }
        else {
            res.status(400).send({ msg: "The given id INVALID"});
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}

const returnBlogsFiltered = async function (req, res) {
let blogFound = await BlogModel.find({ authorId : "xx" });

}


module.exports.myBlogCreation = myBlogCreation