const express = require('express');
const cors  = require("cors")
const mongoose = require("mongoose")
const userAccountModel = require("./Model/account")
const verifyToken = require("./Middleware/verifyToken")
const jwt = require("jsonwebtoken")

mongoose.connect("mongodb://localhost:27017/User_Authentication")  
.then(() =>  console.log("DB connected!") )
.catch(() => console.log("DB not connected"))




const app = express();
app.use(express.json())
app.use(cors())


app.post("/signUp",(req,res) => {
userAccountModel.create(req.body)
.then(result => res.status(200).json(result))
.catch(err => res.status(404).json(err))
})

app.post("/",(req,res) => {
    const {email,password} = req.body;
    userAccountModel.findOne({email})
    .then(result => {
        if(!result){
            return res.json({message:"No user found"})
        }
        if(result.password !== password){
            return res.json({message:"Password is incorrect"})
        }

        const token = jwt.sign({id:result._id},"Your Secret Key",{expiresIn:"1h"})
        return res.status(200).json({message:"Success",token})
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Server error" }); 
    });
})

const port = 3001;

app.listen(port,() => {
    console.log("Server is running")
})