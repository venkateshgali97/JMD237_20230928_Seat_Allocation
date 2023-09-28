var express = require('express');
var router = express.Router();
const loginController = require("../Controllers/Login/login")





router.post('/', loginController.Login)



module.exports = router;