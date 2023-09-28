import Localhost from "../../Http/Http"
let jwt = localStorage.getItem("jwt")

let headers = {
  'access-token': jwt,
};
let config = {
  headers: headers,
};

const UserApis = {
    addUser: async (data) => {
        try {
            const response = await Localhost.post('/user/add', data,config)
            return response
        } catch (err) {
            console.log(err)
        }
    },

    getAllUsers: async() =>{
        try{
            const response = await Localhost.get('user/getAll',config)
            return response
        }catch(err){
            console.log(err)
        }
    },

    LoginUser: async(email) =>{
        try{
            const response = await Localhost.get(`user/${email}`,config)
            return response
        }catch(err){
            console.log(err)
        }
    }, 

    UpdateUser: async(data) =>{
        try{
            const response = await Localhost.put('/user/update',data,config)
            return response
        }catch(err){
            console.log(err)
        }
    }, 
}

export default UserApis