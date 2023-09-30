const express = require("express");
const errorHandler = require("./src/middleware/errorHandler");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

// parent routes
app.use("/api/users", require("./src/routes/userRoute"));
app.use("/api/categories", require("./src/routes/categoryRoute"));
app.use("/api/suppliers", require("./src/routes/supplierRoute"));
app.use("/api/receiveproducts", require("./src/routes/receiveproductRoute"));
app.use("/api/products", require("./src/routes/productRoute"));
app.use("/api/sales", require("./src/routes/saleRoute"));
app.use("/api/paymentTypes", require("./src/routes/paymentTypesRoute"));
app.use("/api/customers", require("./src/routes/customerRoute"));
app.use("/api/exchangeRate", require("./src/routes/exchangeRateRoute"));
app.use("/api/auth", require("./src/routes/authRoute"));
app.use("/api/report", require("./src/routes/reportRoute"));

// for allow middleware error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
