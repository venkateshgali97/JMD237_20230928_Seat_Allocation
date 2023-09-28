import Localhost from "../../Http/Http"
let jwt = localStorage.getItem("jwt")

let headers = {
  'access-token': jwt,
};
let config = {
  headers: headers,
};

const AdminModuleApi = {
 addRoom : async(data) =>{
    try{
        const response = await Localhost.post('/room/add', data,config)
        return response
    }catch(err){
        console.log(err, "This is err")
    }
 },
 getAllRooms: async() =>{
    try{
        const response = await Localhost.get('/room/getAll',config)
        return response
    }catch(err){
        console.log(err, "This is err")
    }
 },

 updateUserDetailsAndRoomDetails : async(data) =>{
    try{
        const response = await Localhost.put('/room/update',data,config)
        return response
    }catch(err){
        console.log(err, "This is err")
    }
 }
}

export default AdminModuleApi