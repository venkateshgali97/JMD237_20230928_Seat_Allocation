const mongoose = require('mongoose');


const boxSchema = new mongoose.Schema({
  // id: String,
  roomNumber: Number,
  is_alloted: Boolean,
});


const dataSchema = new mongoose.Schema({
  name: String,
  boxes: [[boxSchema]]
});


const RoomModel = mongoose.model('Data', dataSchema);

module.exports ={
  RoomModel
};





