const express = require("express");
const dotEnv = require('dotenv')
const mongoose = require('mongoose');
const vendorRoutes = require ('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
 const cors = require('cors');
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4000;

dotEnv.config();
app.use(cors());

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler to direct all routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MONGO DB CONNECTED SUCCEFULLY"))
.catch((error)=>console.log(error))
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/client',clientRoutes);
app.use('/uploads',express.static('uploads'));
app.listen(PORT,()=>{console.log(`server started and running at ${PORT}`);});

app.use('/',(req,res)=>{res.send("<h1>WELCOME TO SWIGGY</h1>");})



