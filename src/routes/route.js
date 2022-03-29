const express = require('express');
const router = express.Router();
const EventController =require("../controllers/EventController")




 
 router.post('/eventss', EventController.createEvents )







module.exports = router;