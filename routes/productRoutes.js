const express = require('express');
const productController = require("../controllers/productController");

const router = express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products',productController.getProductByFirm);
router.get('/:productId',productController.getProductByProductId);
router.get('/all-products',productController.getAllProducts)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.header('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));

});
router.delete('/:productId',productController.deleteProductById)
 router.put('/edit-product/:firmId/:productId', productController.editProductByProductId);

module.exports = router;


/* localhost:4000/product/add-product/66aaf7a30affa16606b61751
{
    "productName":"Idly",
    "price":"30",
    "category":["veg"],
    "bestSeller":"true",
    "description":"Tasty Idly"
} 
{*************GET*************}
    localhost:4000/product/:firmId/products 
    localhost:4000/product/:productId
    localhost:4000/product/all-products
    */