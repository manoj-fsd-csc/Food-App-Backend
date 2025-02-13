
const vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const Vendor = require('../models/Vendor');

dotEnv.config()
const secretKey = process.env.whatIsYourName
const verifyToken = async(req,res,next)=>{
    const token = req.headers.token;

   if(!token){
    return res.status(401).json({error:"Token is required"});
   }
   try{
         const decoded = jwt.verify(token,secretKey)
         const vendor = await Vendor.findById(decoded.vendorId);

         if(!Vendor){
            return res.status(404).json({error:"Vendor Not Found"})
         }

         req.vendorId = vendor._id

         next()

   } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Invalid Token"});
   }
}

module.exports = verifyToken