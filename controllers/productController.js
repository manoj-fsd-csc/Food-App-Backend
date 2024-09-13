
const Product = require("../models/Product");
const multer = require("multer");
const Firm = require('../models/Firm')
const path = require('path');


/* const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
}); */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');   
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname));  
    }
});


const upload = multer({storage:storage});

const addProduct = async(req,res)=>{
    try {
        const {productName,price,category,bestSeller,description} = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"No Firm Found"});            
        }
        const product = new Product({
            productName,price,category,bestSeller,description,image,firm: firm._id
        })
        const savedProduct = await product.save();
        /*  firm.products.push(savedProduct); */
        await firm.save()                
        res.status(200).json(savedProduct)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getProductByFirm = async(req,res) =>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"No Fir  Found"});
        }
        const restaurentName = firm.firmName;
        const restaurentId= firm._id;
        const restaurentArea = firm.area;
        const restaurentImage = firm.image;
        const restaurentCategory = firm.category;
        
        const products = await Product.find({firm:firmId})
        console.log("product details API :",products)
        
        res.status(200).json({restaurentName,restaurentArea,restaurentImage,restaurentId,restaurentCategory,products})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}


const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find().populate('firm');
        res.json({products})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"});
    }
}

const getProductByProductId= async(req,res) =>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        console.log("product details API :",product)
        if(!product){
            return res.status(404).json({error:"No product Found"});
        }
        const productName = product.productName;
        const productPrice = product.price;
        const productImage = product.image;
        const productproductId = product._id;

        
        const ProductDetails  = await Product.findOne({ _id: productId });

        console.log("product details API :",ProductDetails)
        
        res.status(200).json({productName,productPrice,productImage,productproductId,ProductDetails
            
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}


 

const editProductByProductId = async (req, res) => {
    try {
        const { productId, firmId } = req.params;
        const { productName, price, category, bestSeller, description } = req.body;
        console.log("firmId",firmId)
        console.log("productId",productId)
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "No product found" });
        }

        if (product.firm.toString() !== firmId) {
            return res.status(403).json({ error: "Unauthorized action" });
        }

         product.productName = productName || product.productName;
        product.price = price || product.price;
        product.category = category || product.category;
        product.bestSeller = bestSeller !== undefined ? bestSeller : product.bestSeller;
        product.description = description || product.description;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteProductById = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({error:"No Product Found"})
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = {
    addProduct: [upload.single('image'), addProduct],
    getProductByFirm,
    getProductByProductId,
    deleteProductById,
    getAllProducts,
    editProductByProductId: [upload.single('image'), editProductByProductId],
};



/*  const Product = require("../models/Product");
const multer = require("multer");
const Firm = require('../models/Firm')
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: firm._id
        })

        const savedProduct = await product.save();
        firm.product.push(savedProduct);


        await firm.save()

        res.status(200).json(savedProduct)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}
module.exports = { addProduct: [upload.single('image'), addProduct]}; */