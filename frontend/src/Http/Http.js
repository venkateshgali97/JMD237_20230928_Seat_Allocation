import axios from 'axios'

const Localhost =axios.create({
    baseURL:'http://localhost:8000'
})

export default Localhost;