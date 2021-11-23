const express = require('express');
const router = express.Router();

const UserController =require("../controllers/usercontroller")
const commonMw = require("../middleware/commonmw")
const productController = require("../controllers/productcontroller")
const orderController = require("../controllers/ordercontroller")




router.post('/users', commonMw.validateAppType, UserController.createUser);
router.post('/products', productController.createproduct);
router.post('/orders', commonMw.validateAppType, orderController.createOrder);





module.exports = router;