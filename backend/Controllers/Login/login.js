
const bcrypt = require('bcrypt')
const { User } = require("../../Entity/userSchema")
const { Admin } = require("../../Entity/adminSchema")
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const adminValidattion = await Admin.find({ email: email })
        if (adminValidattion.length !== 0) {
          
            let isValidAdmin = await bcrypt.compare(password, adminValidattion[0].password)
            if (isValidAdmin) {
                const jwtAccessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({ role: 'admin', email : email ,jwt : jwtAccessToken})
            }
            else{
                res.status(201).json({message : "Password didn't match"})
            } 
        }
        else {
            const emailValidation = await User.find({ email: email })   
            
            if (emailValidation.length !== 0) {
                let isValidUser = await bcrypt.compare(password, emailValidation[0].password)
                if (isValidUser) {
                    const jwtAccessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
                    res.status(200).json({role : 'user', email:email, name : emailValidation[0].name,jwt : jwtAccessToken })

                } else {
                    res.status(201).json({message : "Password didn't match"})
                }
            }
            else{
                res.status(202).json({message : "email not found"})
            }

        }
        

    } catch (err) {
        return res.status(500).json("Login Failed")

    }
}

module.exports = {
    Login
}