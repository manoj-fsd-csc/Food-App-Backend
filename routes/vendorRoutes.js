const vendorController = require('../controllers/VendorController');
const express = require('express');

const router = express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);

router.get('/all-vendors',vendorController.getAllVendors);

router.get('/single-vendor/:id',vendorController.getVendorById)


// localhost:4000/vendor/register
/* {    
  "username":"manoj",
  "email":"manoj541@gmail.com",
  "password":"manoj54321"
  } */
 // localhost:4000/vendor/login
 /* {
  "email":"manoj541@gmail.com",
  "password":"manoj54321"
  } */
 /* //localhost:4000/firm/add-firm 
 
 */
/* **********GET*********** */
//localhost:4000/vendor/all-vendors


module.exports = router;