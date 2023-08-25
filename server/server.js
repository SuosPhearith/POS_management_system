const  express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
require('dotenv').config();
const port = process.env.POST;
app.use(express.json());


// parent routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/categories', require('./routes/categoryRoute'));
app.use('/api/suppliers', require('./routes/supplierRoute'));
app.use('/api/receiveproducts', require('./routes/receiveproductRoute'));
app.use('/api/products', require('./routes/productRoute'));



// for allow middleware error
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`);
})