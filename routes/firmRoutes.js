const express = require('express');
const firmController = require('../controllers/firmController')
const verifyToken = require('../middlewares/verifyToken');
 
const router = express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
 
router.get('/:firmId',firmController.getFirmByFirmId);

router.delete('/:firmId', firmController.deleteFirmById);
/* // localhost:4000/firm/add-firm
/* // localhost:4000/firm/firmId
/* // localhost:4000/user/userId
/* // localhost:4000/user/AlluserId
{
    "firmName":"MK-Resturant",
    "area":"Thiruvallur",
    "category":["veg","non-veg"],
    "region":["south-india","north-india"],
    "offer":"50% off",
    "image":"example.jpg"
} */

module.exports = router;