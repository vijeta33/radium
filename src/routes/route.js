const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const authorController =require("../controllers/Authorcontroller")
const blogcontroller =require("../controllers/Blogcontroller")



router.post('/BASE_URL/authors', authorController.createAuthor )

router.post('/blogs', blogcontroller.myBlogCreation )



module.exports = router;