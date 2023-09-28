const {User} = require("../../Entity/userSchema")

const create_user = async(req,res) =>{
    let {name,email,contact,designation} = req.body
  
    const data = await User.find({email})
    if(data.length === 0){
        const newData = new User({name,email,contact,designation})
        await newData.save()
        return res.status(200).json("User Created  successfully...")
    }
    else{
        return res.status(201).json("User already existed..")
    }
}

const get_all_users = async(req,res) =>{
    let users = await User.find()
    res.send(users)
}

const get_logInUser = async(req,res) =>{
    console.log(req.params.email)
   
    let users = await User.find({email : req.params.email})
    res.send(users)
}

const update_user = async (req, res) => {
    const { name, email, contact, designation, roomNumber, roomName } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      user.name = name;
      user.contact = contact;
      user.designation = designation;
      user.roomNumber = roomNumber;
      user.roomName = roomName;
  
      await user.save();
  
      return res.status(200).json("User updated successfully");
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  };
  


module.exports = {
    create_user,
    get_all_users,
    get_logInUser,
    update_user
}