const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
require('dotenv').config();

let app = express()


app.use(express.json())
app.use(cors())
app.listen(8000,() => console.log("server is running"))


mongoose.connect(process.env.mongo_connection_string)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err))




const roomRouter = require("./Routes/room")
const userRouter = require("./Routes/user")
const logInRouter = require("./Routes/login")

app.use("/room",roomRouter )
app.use("/user", userRouter)
app.use("/login",logInRouter)



