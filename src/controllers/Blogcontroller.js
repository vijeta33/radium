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
    console.log(req.query);
    let blogFound=await BlogModel.find(req.query);
    let len =blogFound.length;
    let arr=[];
    for(let i=0;i<len;i++)
    {
        if(blogFound[i].isDeleted==false && blogFound[i].isPublished==true || blogFound[i].isPublished==false)
        {
            arr.push(blogFound[i]);
        }
        else{
            continue
        }
    }
    console.log(arr);
    if(arr){
        res.status(200).send({msg:"succes",data:arr});
    }
    else{
        res.status(404).send({msg:"No such book is found"});
    }
}


module.exports.myBlogCreation = myBlogCreation
module.exports.returnBlogsFiltered = returnBlogsFiltered
