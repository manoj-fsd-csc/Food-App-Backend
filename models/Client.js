const mongoose = require('mongoose');

const clientSchema = new mongoose .Schema({
    username: {
        type : String ,
        required : true
    },
    email: {
        type : String ,
        required : true,   
        unique : true 
    },
    address: {
        type : String ,
        required : true, 
    },
    phoneNo: {
        type : Number ,
        required : true, 
        unique : true 
    },
    password: {
        type : String ,
        required : true, 
    }
});

const Client  = mongoose.model('Client',clientSchema);
module.exports = Client;


// localhost:4000/client/register
/* {    
    "username":"manoj",
    "email":"manoj541@gmail.com",
    "password":"manoj54321",
    "address":"Chennai"
    }
     address: {
        type : String ,
        required : true, 
    }, */