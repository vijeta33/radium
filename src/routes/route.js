const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const authorController =require("../controllers/Authorcontroller")
const blogcontroller =require("../controllers/Blogcontroller")
const logincontroller =require("../controllers/logIn")
const middleWare =require("../vlidation/validation")



router.post('/BASE_URL/authors', authorController.createAuthor )

router.post('/blogs',middleWare.validation, blogcontroller.myBlogCreation )
router.get('/getdata',middleWare.validation, blogcontroller.returnBlogsFiltered);
router.put('/update/blogId/:id',middleWare.validation, blogcontroller.updateData);
router.get('/delete/blogId/:id',middleWare.validation, blogcontroller.deleteBlog);
router.get('/deleteSpecific',middleWare.validation, blogcontroller.deleteSpecific);
router.post('/login', logincontroller.logIn)


module.exports = router;