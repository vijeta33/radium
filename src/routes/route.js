const express = require('express');
const router = express.Router();

const CollegeController =require("../controllers/Collegecontroller")






router.post('/functionup/colleges', CollegeController.registercollege)
router.post('/functionup/interns',CollegeController.createintern)
router.get('/functionup/collegeDetails',CollegeController.alldetails)







module.exports = router;