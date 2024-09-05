const Client = require('../models/Client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

 const secretKey = process.env.whatIsYourName


 

const clientRegister = async(req,res)=>{
    const{username,email,password,phoneNo,address} = req.body;
    try{
        const clientEmail = await Client.findOne({email});
        if (clientEmail){
            return res.status(400).json("Email already taken")
        };
        const hashedPassword = await bcrypt.hash(password,10);

        const newClient = new Client({
            username,
            email,
            address,
            phoneNo,
            password:hashedPassword
        });
        await newClient.save();
        
        res.status(201).json({message:"Client Registered Successfully"});
        console.log('registered')
        
        
    }catch(error) {
        console.log('ERROR',error)
        res.status(500).json({error: "Here Internal server error"})
    }
}

const clientLogin = async(req,res)=>{
    const{email,password}=req.body;
    try{
        const client = await Client.findOne({email});
        if(!client || !(await bcrypt.compare(password,client.password))){
            return res.status(401).json({error:"Invalid email  or password"})
        }
        const token = jwt.sign({clientId:client._id},secretKey,{expiresIn:"1h"})
        const clientId = client._id;
          res.status(200).json({success:"Login Successful",token,clientId})
        console.log(email,"This is a Token :",token);

    }catch(error){
       console.log(error);
       res.status(500).json({error:"Internal server error"});
    }
}

const getClientById = async (req,res)=>{
    const clientId = req.params.id;
    try{
        const client = await Client.findById(clientId) 
        // const client = await Client.findById(clientId).populate('firm');
        if(!client){
            return res.status(404).json({error:"client Not Found"})
        }
        // const clientFirmId = client.firm[0]._id;
        res.status(200).json({clientId,client})
        // res.status(200).json({clientId,clientFirmId,client})
        // console.log(clientFirmId);
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"});
    }
} 

module.exports={clientRegister,clientLogin,getClientById}