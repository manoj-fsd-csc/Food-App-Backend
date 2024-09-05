
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname (file.originalname));
    }
});


const upload = multer({storage:storage});
const addFirm = async(req,res)=>{
    try{
        const {firmName,area,category,region,offer} = req.body;

         const image = req.file?req.file.filename:undefined;
    
         const vendor = await Vendor.findById(req.vendorId)
    
         if(!vendor){
        res.status(404).json({message:"Vendor not found"})
          }

    if(vendor.firm.length>0){            
        return res.status(400).json({message:"Vendor can have only one Firm "})
    }

    
    
    const firm = new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor:vendor._id
        })
        
        const savedFirm = await firm.save();

        const firmId = savedFirm._id

        vendor.firm.push(savedFirm)

        await vendor.save()

        
        return res.status(200).json({message:"Firm Add Sucessfully",firmId})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


     const getFirmByFirmId = async(req,res) =>{
        try {
            const firmId = req.params.firmId;
            const firm = await Firm.findById(firmId);
            if(!firm){
                return res.status(404).json({error:"No Firm  Found"});
            }
            const restaurentName = firm.firmName;
            const restaurentId = firm._id;
            const restaurentArea = firm.area;
            const restaurentImage = firm.image;
            
            const firmData = await Firm.findOne({_id:firmId});
            
            console.log("product details API :",firmData)
            
            res.status(200).json({restaurentId,restaurentName,restaurentArea,restaurentImage,firmData})
        } catch (error) {
            console.error(error)
            res.status(500).json({error:"Internal Server Error"})
        }
    }



const deleteFirmById = async(req,res)=>{
    try {
        const firmId = req.params.firmtId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if(!deletedFirm){
            return res.status(404).json({error:"No Product Found"})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}
module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirmById,getFirmByFirmId}