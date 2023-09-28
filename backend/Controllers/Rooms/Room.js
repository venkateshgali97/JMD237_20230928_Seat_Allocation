const {RoomModel} = require("../../Entity/roomSchema")

const add_room = async(req,res) =>{
    let {name, boxes} = req.body
  
    const data = await RoomModel.find({name})
    if(data.length === 0){
        const newData = new RoomModel({name, boxes})
        await newData.save()
        return res.status(200).json({message : "Room added successfully..."})
    }
    else{
        return res.status(201).json({message : "Room already existed.."})
    }
}

const get_all_rooms = async(req,res) =>{
    let rooms = await RoomModel.find()
    res.send(rooms)
}

const update_room = async (req, res) => {
  const { currentRoomName, currentRoomNumber, previousRoomName, previousRoomNumber } = req.body;
  console.log(currentRoomName, currentRoomNumber, previousRoomName, previousRoomNumber)

  try {
    // Find the current room and update the current box
    const currentRoom = await RoomModel.findOne({ name: currentRoomName });

    if (!currentRoom) {
      console.log("No matching current room found");
      return res.status(404).send("No matching current room found");
    }

    let currentBoxUpdated = false;

    for (let i = 0; i < currentRoom.boxes.length; i++) {
      const innerArray = currentRoom.boxes[i];
      for (let j = 0; j < innerArray.length; j++) {
        const box = innerArray[j];
        if (box.roomNumber === currentRoomNumber) {
          box.is_alloted = true;
          console.log(box, "Updated current box");
          currentBoxUpdated = true;
          break;
        }
      }
      if (currentBoxUpdated) {
        break;
      }
    }

    // If the current box was updated, save the changes
    if (currentBoxUpdated) {
      await currentRoom.save();
    } else {
      console.log("No matching current box found");
      return res.status(404).send("No matching current box found");
    }

    // If there's a previous room, find and update the previous box
    if (previousRoomName) {
      const previousRoom = await RoomModel.findOne({ name: previousRoomName });

      if (!previousRoom) {
        console.log("No matching previous room found");
        return res.status(404).send("No matching previous room found");
      }

      let previousBoxUpdated = false;

      for (let i = 0; i < previousRoom.boxes.length; i++) {
        const innerArray = previousRoom.boxes[i];
        for (let j = 0; j < innerArray.length; j++) {
          const box = innerArray[j];
          if (box.roomNumber === previousRoomNumber) {
            box.is_alloted = false;
            console.log(box, "Updated previous box");
            previousBoxUpdated = true;
            break;
          }
        }
        if (previousBoxUpdated) {
          break;
        }
      }

      // If the previous box was updated, save the changes
      if (previousBoxUpdated) {
        await previousRoom.save();
      } else {
        console.log("No matching previous box found");
        return res.status(404).send("No matching previous box found");
      }
    }

    // Respond once both updates are completed
    console.log("Box updates completed successfully");
    res.status(200).send("Box updates completed successfully");
  } catch (error) {
    console.error("Error updating boxes:", error);
    res.status(500).send("Error updating boxes");
  }
};




module.exports = {
    add_room,
    get_all_rooms,
    update_room
}