const BlogModel = require('../models/BlogModels')
const AuthorModel = require('../models/AuthorModel')

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
            res.status(400).send({ msg: "The given id INVALID" });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}

const returnBlogsFiltered = async function (req, res) {
    try {

        let body = req.query;
        body.isDeleted = false;
        body.isPublished = true;
        let foundBlogs = await BlogModel.find(body);
        if (foundBlogs) {
            res.status(200).send({ status: true, data: foundBlogs });
        }
        else {
            res.status(404).send({ status: false, msg: "No documents found" });
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Some error occured" });
    }
}


const updateData = async function (req, res) {
    try {
        let blogId = req.params.id;
        let data = await BlogModel.findOne({ _id: blogId });
        let update = req.body;
        if (!data) {
            return res.status(404).send({ status: false, msg: "Provide valid BlogId" });
        }
        if (data.isDeleted == true) {
            return res.send({ status: false, msg: "This book is no longer exists" });
        }
        if (update) {
            if (update.title) {
                data.title = update.title;
            }
            if (update.publishedAt) {
                data.publishedAt = update.publishedAt;
                data.isPublished = true
            }
            if (update.subcategory) {
                data.subcategory.push(update.subcategory);// need to change the type to array of subcateory and category to string.
            }
            if (update.Body) {
                data.Body = update.Body;
            }
            if (update.tags) {

                data.tags.push(update.tags);// we have to add push in array
            }
            data.save();
        }
        else {
            res.send({ msg: "Please provide data to update" });
        }
        res.status(200).send({ msg: "Succesful", data: data });
    }
    catch (err) {
        res.status(400).send({ msg: "Some error occured" });
    }
}
const deleteBlog = async function (req, res) {
    try {
        let id1 = req.params.id
        let data = await BlogModel.findOne({ _id: id1 });
        if (!data) {
            return res.status(404).send({ status: false, msg: "Blog id doesnot exits" });
        }
        else {
            data.isDeleted = true;
            data.save();
            res.status(200).send({ msg: "succesful"});
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Some error occured" });
    }
}
const deleteSpecific = async function (req, res) {
    try {
        let obj = {isPublished: false};

        if (req.query.category) {
            obj.category = req.query.category
        }
        if (req.query.authorId) {
            obj.authorId = req.query.authorId;
        }
        if (req.query.tag) {
            obj.tag = req.query.tag
        }
        if (req.query.subcategory) {
            obj.subcategory = req.query.subcategory
        }
        
        let data = await BlogModel.findOne(obj);
        if (!data) {
            return res.status(404).send({ status: false, msg: "The given data is Invalid" });
        }
        data.isDeleted = true;
        data.save();
        res.status(200).send({ msg: "succesful", data: data });
    }
    catch (err) {
        res.status(500).send({ msg: err });
    }
}
module.exports.myBlogCreation = myBlogCreation
module.exports.returnBlogsFiltered = returnBlogsFiltered
module.exports.updateData = updateData;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteSpecific = deleteSpecific;
