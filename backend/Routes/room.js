var express = require('express');
var router = express.Router();
const roomController = require("../Controllers/Rooms/Room")
const { authenticateUser } = require('../Middleware/middleware');






router.post('/add', authenticateUser,roomController.add_room)
router.get('/getAll',authenticateUser, roomController.get_all_rooms)
router.put("/update",authenticateUser, roomController.update_room)



module.exports = router;