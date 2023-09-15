const db = require("../config/db");
const executeQuery = db.executeQuery;
const currentDate = require("../utils/currentDate");
const asyncHandler = require("express-async-handler");

const getList = asyncHandler(async (req, res, next) => {
  try {
    const getListinvoices = "select * from invoices";
    const getList = await executeQuery(getListinvoices);
    res.json({
      invoices: getList,
    });
  } catch (error) {
    next(error);
  }
});

const getListDetail = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const getListinvoices = "select * from sales where invoice_id = ?";
    const getList = await executeQuery(getListinvoices, [id]);
    res.json({
      sales: getList,
    });
  } catch (error) {
    next(error);
  }
});

const getListDebt = asyncHandler(async (req, res, next) => {
  try {
    const getListinvoices = "select * from invoices where debt > 0";
    const getList = await executeQuery(getListinvoices);
    res.json({
      invoices: getList,
    });
  } catch (error) {
    next(error);
  }
});

const getListDebtLate = asyncHandler(async (req, res, next) => {
  try {
    const getListinvoices =
      "select * from invoices where created_date < DATE_SUB(NOW(), INTERVAL 1 WEEK) and debt > 0";
    const getList = await executeQuery(getListinvoices);
    res.json({
      invoices: getList,
    });
  } catch (error) {
    next(error);
  }
});

const create = asyncHandler(async (req, res, next) => {
  const connection = await db.pool.getConnection();
  try {
    const {
      user_id,
      customer_id,
      payment_type_id,
      saleType,
      deposit,
      products,
    } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      res.status(400);
      throw new Error("Please input product");
    }

    const queryCheckuser = "select * from users where id = ?";
    const checkUser = await executeQuery(queryCheckuser, [user_id]);
    if (checkUser.length === 0) {
      res.status(400);
      throw new Error("ID user not found!");
    }
    const queryCustomer = "select * from customers where id = ?";
    const checkCustomer = await executeQuery(queryCustomer, [customer_id]);
    if (checkCustomer.length === 0) {
      res.status(400);
      throw new Error("ID customer not found!");
    }
    const queryPaymentType = "select * from paymenttypes where id = ?";
    const checkPayment = await executeQuery(queryPaymentType, [
      payment_type_id,
    ]);
    if (checkPayment.length === 0) {
      res.status(400);
      throw new Error("ID payment user not found!");
    }

    if (!user_id || !customer_id || !payment_type_id || !saleType || !deposit) {
      res.status(400);
      throw new Error("Please input all field!");
    }
    async function calculateTotalAmount(products) {
      let total = 0;

      for (const product of products) {
        let productPrice = product.price * 1;

        if (
          productPrice &&
          typeof productPrice === "number" &&
          product.cashType === "dollar"
        ) {
          total += productPrice * product.quantity;
        } else if (
          productPrice &&
          typeof productPrice === "number" &&
          product.cashType === "riel"
        ) {
          const exchangeRateQuery =
            "select riel from exchangeRate where id = 1";
          const query = await executeQuery(exchangeRateQuery);
          const exchangeRate = query[0].riel * 1;
          console.log(exchangeRate);
          total += (productPrice / exchangeRate) * product.quantity;
        }
      }

      return total;
    }

    async function calculateTotalKhmerCurrency(products) {
      let total = 0;

      for (const product of products) {
        let productPrice = product.price * 1;

        if (
          productPrice &&
          typeof productPrice === "number" &&
          product.cashType === "riel"
        ) {
          total += productPrice * product.quantity;
        }
      }

      return total;
    }
    async function calculateTotalUSDCurrency(products) {
      let total = 0;

      for (const product of products) {
        let productPrice = product.price * 1;

        if (
          productPrice &&
          typeof productPrice === "number" &&
          product.cashType === "dollar"
        ) {
          total += productPrice * product.quantity;
        }
      }
      return total;
    }
    const exchangeRateQuery = "select riel from exchangeRate where id = 1";
    const query = await executeQuery(exchangeRateQuery);
    const exchangeRate = query[0].riel * 1;
    const totalAmountUSD = await calculateTotalAmount(products);
    let totalAmountKhmer = totalAmountUSD * exchangeRate;
    const totalKhmer = await calculateTotalKhmerCurrency(products);
    const totalUSD = await calculateTotalUSDCurrency(products);
    let debt = totalAmountUSD - deposit * 1;
    if (deposit * 1 > totalAmountUSD) {
      res.status(400);
      throw new Error("Deposite invalid!");
    }
    // Insert into two table at once if query 1 success but query 2 not success is not commit all
    await connection.beginTransaction();
    // Insert into invoices
    let created_date = new Date().toISOString();
    let updated_date = new Date().toISOString();
    const queryInvoice =
      "insert into invoices (customer_id, saleType, payment_type_id, products_khmer_currency, products_USD_currency, total_amount_USD, total_amount_khmer, debt, deposit, created_date, updated_date, user_id) values (?,?,?,?,?,?,?,?,?,?,?,?)";
    const queryInvoiceValue = [
      customer_id,
      saleType,
      payment_type_id,
      totalKhmer,
      totalUSD,
      totalAmountUSD,
      totalAmountKhmer,
      debt,
      deposit,
      created_date,
      updated_date,
      user_id,
    ];
    const [insertInvoice] = await connection.query(
      queryInvoice,
      queryInvoiceValue
    );
    // Get invoice id from this query
    const invoice_id = insertInvoice.insertId;
    if (!invoice_id) {
      res.status(500);
    }
    // Insert into sales
    const querySale =
      "insert into sales (invoice_id, product_id, quantity, unit_price, sub_total) values ?";
    const querySaleValue = products.map((product) => [
      invoice_id,
      product.product_id,
      product.quantity,
      product.price,
      product.price * product.quantity,
    ]);
    const [insertSale] = await connection.query(querySale, [querySaleValue]);
    if (insertSale.affectedRows === 0) {
      res.status(500);
    }
    // commit this code to database
    await connection.commit();
    res.status(201).json({
      message: "Sale successfully!",
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
});
const update = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { customer_id, payment_type_id, deposit } = req.body;
    const customerId = customer_id * 1;
    const paymentTypeId = payment_type_id * 1;
    const depositValue = deposit * 1;
    if (!customer_id || !payment_type_id || !deposit) {
      res.status(400);
      throw new Error("Please input all field!");
    }
    if (customerId < 0 || paymentTypeId < 0 || depositValue < 0) {
      res.status(400);
      throw new Error("Invalid fields!");
    }
    // select total USD for updating invoice debt
    const getTotalUSEQuery =
      "select total_amount_USD from invoices where id = ?";
    const getTotalUSD = await executeQuery(getTotalUSEQuery, [id]);
    const totalUSD = getTotalUSD[0].total_amount_USD * 1;
    if (depositValue > totalUSD) {
      res.status(400);
      throw new Error("Invalid deposit!");
    }
    let newTotalUSD = totalUSD - depositValue;
    const updateQuery =
      "update invoices set customer_id = ?, payment_type_id = ?, deposit = ?, debt = ? where id = ?";
    const update = await executeQuery(updateQuery, [
      customerId,
      paymentTypeId,
      depositValue,
      newTotalUSD,
      id,
    ]);
    if (update.affectedRows > 0) {
      res.status(200).json({
        message: "Update successfully",
      });
    }
  } catch (error) {
    next(error);
  }
});
const remove = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const queryDelete = "delete from invoices where id = ?";
    await executeQuery(queryDelete, [id]);
    res.json({
      message: "Deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const payBack = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { deposit } = req.body;
    const depositValue = deposit * 1;
    if (!deposit) {
      res.status(400);
      throw new Error("Please input deposit!");
    }
    if (depositValue < 0) {
      res.status(400);
      throw new Error("Invalid fields!");
    }
    // select total USD for updating invoice debt
    const getTotalUSEQuery = "select debt from invoices where id = ?";
    const getTotalUSD = await executeQuery(getTotalUSEQuery, [id]);
    const debt = getTotalUSD[0].debt * 1;
    if (depositValue > debt) {
      res.status(400);
      throw new Error("Invalid deposit!");
    }
    // select total USD for updating invoice deposit
    const getDepositQuery = "select deposit from invoices where id = ?";
    const getDeposit = await executeQuery(getDepositQuery, [id]);
    const oldDeposit = getDeposit[0].deposit * 1;
    let newDeposit = oldDeposit + depositValue;
    let newDebt = debt - depositValue;
    const updateQuery =
      "update invoices set deposit = ?, debt = ? where id = ?";
    const update = await executeQuery(updateQuery, [newDeposit, newDebt, id]);
    if (update.affectedRows > 0) {
      res.status(200).json({
        message: "Payed successfully",
      });
    }
  } catch (error) {
    next(error);
  }
});

const payBackAll = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    // select total USD for updating invoice debt
    const getTotalUSEQuery =
      "select total_amount_USD from invoices where id = ?";
    const getTotalUSD = await executeQuery(getTotalUSEQuery, [id]);
    const totalUSD = getTotalUSD[0].total_amount_USD * 1;
    const updateQuery =
      "update invoices set deposit = ?, debt = ? where id = ?";
    const update = await executeQuery(updateQuery, [totalUSD, 0, id]);
    if (update.affectedRows > 0) {
      res.status(200).json({
        message: "Pay all successfully",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getList,
  create,
  update,
  remove,
  payBack,
  payBackAll,
  getListDebt,
  getListDebtLate,
  getListDetail,
};
