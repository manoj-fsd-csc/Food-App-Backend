const ClientController = require('../controllers/ClientController');
const express = require('express');

const router = express.Router();

router.post('/registerC',ClientController.clientRegister);
router.post('/loginC' ,ClientController.clientLogin);
router.get('/single-Client/:id',ClientController.getClientById)

// router.get('/all-vendors',vendorController.getAllVendors);

// localhost:4000/client/register
 
// localhost:4000/client/registerC
/* {    
    "username":"manoj",
    "email":"manoj541@gmail.com",
    "password":"manoj54321",
    "phoneNo" : 1234567891,
    "address":"Chennai"
    } */
// localhost:4000/client/loginC
/* {    
    "email":"manoj541@gmail.com",
    "password":"manoj54321"
    } */
// localhost:4000/client/single-Client/:id
module.exports = router;