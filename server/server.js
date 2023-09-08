const  express = require("express");
const errorHandler = require("./src/middleware/errorHandler");
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.POST;
app.use(express.json());
app.use(cors());


// parent routes
app.use('/api/users', require('./src/routes/userRoute'));
app.use('/api/categories', require('./src/routes/categoryRoute'));
app.use('/api/suppliers', require('./src/routes/supplierRoute'));
app.use('/api/receiveproducts', require('./src/routes/receiveproductRoute'));
app.use('/api/products', require('./src/routes/productRoute'));



// for allow middleware error
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`);
})