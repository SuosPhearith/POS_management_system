const db = require("../config/db");
const executeQuery = db.executeQuery;
const asyncHandler = require("express-async-handler");
const getListDebt = asyncHandler(async (req, res, next) => {
  try {
    const getListinvoices =
      "select i.id, i.description, i.customer_id, i.payment_type_id, c.name as customer_name, i.saleType, p.name as payment_name, i.products_khmer_currency, i.products_USD_currency, i.total_amount_USD, i.total_amount_khmer, i.debt, i.deposit, i.created_date, i.updated_date, u.fullname as user_fullname from invoices as i join customers as c on i.customer_id = c.id join paymenttypes as p on i.payment_type_id = p.id join users as u on i.user_id = u.id where i.debt > 0  " +
      " order by i.created_date ASC";
    const getList = await executeQuery(getListinvoices);
    res.json({
      invoices: getList,
    });
  } catch (error) {
    next(error);
  }
});
const getListProductsLess = asyncHandler(async (req, res, next) => {
  try {
    const queryGetList =
      "select p.id, p.box_code, p.unit_code, p.name, p.order_quantity, p.quantity, c.name as category_name, p.category_id, p.unit_quantity, p.cashType, p.purchase_price, p.product_price, p.unit_price, p.special_price,p.discount_per, p.description, p.image, p.created_date, p.updated_date, p.user_id from products as p inner join categories as c on p.category_id = c.id where p.unit_quantity * 2 > p.quantity";
    const getList = await executeQuery(queryGetList);
    res.json({
      products: getList,
    });
  } catch (error) {
    next(error);
  }
});
const getListReportData = asyncHandler(async (req, res, next) => {
  try {
    // 1. total invoice
    const total_invoice = "select count(id) as total_invoice from invoices";
    const invoice = await executeQuery(total_invoice);
    // 2. total debt invoice
    const total_invoice_debt =
      "select count(id) as total_invoice_debt from invoices where debt > 0";
    const invoiceDebt = await executeQuery(total_invoice_debt);
    // 3. total debt late invoice
    const total_invoice_debt_late =
      "select count(id) as total_invoice_debt_late from invoices where created_date < DATE_SUB(NOW(), INTERVAL 1 WEEK) and debt > 0";
    const invoiceDebtLate = await executeQuery(total_invoice_debt_late);
    // 4. total customer
    const total_customer = "select count(id) as total_customer from customers";
    const customer = await executeQuery(total_customer);
    // 5. total supplier
    const total_supplier = "select count(id) as total_supplier from suppliers";
    const supplier = await executeQuery(total_supplier);
    // 6. total payall
    const total_payall =
      "select count(id) as total_payall from invoices where debt = 0";
    const totalPayall = await executeQuery(total_payall);
    // 7. total sale money
    const total_sale_money =
      "select sum(total_amount_USD) as total_sale_money from invoices where debt = 0";
    const totalSaleMoney = await executeQuery(total_sale_money);
    // 8. total debt money
    const total_debt_money =
      "select sum(debt) as total_debt_money from invoices where debt > 0";
    const totalDebtMoney = await executeQuery(total_debt_money);
    // 9. total money
    const total_money =
      "select sum(total_amount_USD) as total_money from invoices";
    const totalMoney = await executeQuery(total_money);
    res.json({
      total_invoice: invoice,
      total_invoice_debt: invoiceDebt,
      total_invoice_debt_late: invoiceDebtLate,
      total_customer: customer,
      total_supplier: supplier,
      total_payall: totalPayall,
      total_sale_money: totalSaleMoney,
      total_debt_money: totalDebtMoney,
      total_money: totalMoney,
    });
  } catch (error) {
    next(error);
  }
});
const getListReportDataDateToDate = asyncHandler(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Define the date range condition
    let dateRangeCondition = "";
    if (startDate && endDate) {
      dateRangeCondition = `created_date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    // 10. total invoice
    const total_invoice_query = `
        SELECT COUNT(id) AS total_invoice
        FROM invoices
        ${dateRangeCondition ? `WHERE ${dateRangeCondition}` : ""}`;

    const total_invoice = await executeQuery(total_invoice_query);

    // 11. total sale money
    const total_sale_money_query = `
        SELECT SUM(total_amount_USD) AS total_sale_money
        FROM invoices
        ${dateRangeCondition ? `WHERE ${dateRangeCondition}` : ""}`;

    const total_sale_money = await executeQuery(total_sale_money_query);

    // 12. total debt money
    const total_debt_money_query = `
        SELECT SUM(debt) AS total_debt_money
        FROM invoices
        WHERE debt > 0
        ${dateRangeCondition ? `AND ${dateRangeCondition}` : ""}`;

    const total_debt_money = await executeQuery(total_debt_money_query);

    // console.log({ total_invoice }, { total_sale_money }, { total_debt_money });

    res.json({
      total_invoice,
      total_sale_money,
      total_debt_money,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getListDebt,
  getListProductsLess,
  getListReportData,
  getListReportDataDateToDate,
};
