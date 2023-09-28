var express = require('express');
var router = express.Router();
const userController = require("../Controllers/Users/User")
const { authenticateUser } = require('../Middleware/middleware');





router.post('/add',authenticateUser, userController.create_user)
router.get('/getAll',authenticateUser, userController.get_all_users)
router.get('/:email',authenticateUser, userController.get_logInUser)
router.put("/update",authenticateUser, userController.update_user)



module.exports = router;