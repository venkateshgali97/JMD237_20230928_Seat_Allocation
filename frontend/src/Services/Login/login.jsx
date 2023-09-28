import Localhost from "../../Http/Http"
const loginApi = {
 login : async(logInDetails) =>{
    try{
        const response = await Localhost.post('/login', logInDetails) 
        return response
    }catch(err){
        console.log(err, "This is err")
    }

 }
}

export default loginApi