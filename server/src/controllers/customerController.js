const db = require("../config/db");
const executeQuery = db.executeQuery;
const asyncHandler = require("express-async-handler");

const getList = asyncHandler(async (req, res, next) => {
  try {
    // const getListinvoices = "select * from invoices";
    const pagination = process.env.PAGINATION_VALUE * 1;
    const search = req.query.search ? req.query.search : "";
    const currentPage = req.query.page >= 1 ? req.query.page : 1;
    const offset = (currentPage - 1) * pagination;
    let querySearch = "";
    let getListinvoices = "select * from customers order by id desc";
    if (search !== "" || currentPage !== 1) {
      querySearch = `where id = '${search}' or name LIKE '%${search}%'`;
      getListinvoices =
        "select * from customers " + querySearch + " LIMIT ?, ?"; // Move the LIMIT clause to this position
    }

    const getList = await executeQuery(getListinvoices, [offset, pagination]);
    const getListTotal = "select count(id) as total_row from customers";
    const total = await executeQuery(getListTotal);
    res.json({
      customers: getList,
      total_row: total,
    });
  } catch (error) {
    next(error);
  }
});
const create = asyncHandler(async (req, res, next) => {
  try {
    const { name, contact, address } = req.body;
    const file = req.file;
    let image = null;
    if (file) {
      image = file.filename;
    }
    if (!name) {
      res.status(400);
      throw new Error("Please input name!");
    }
    const queryCheck = "select name from customers where name = ?";
    const check = await executeQuery(queryCheck, [name]);
    if (check.length > 0) {
      res.status(409);
      throw new Error("This payment is exist!");
    }
    const createCustomer =
      "insert into customers (name, contact, address, image) values (?,?,?,?)";
    const create = await executeQuery(createCustomer, [
      name,
      contact,
      address,
      image,
    ]);
    if (create.affectedRows === 0) {
      res.status(400);
      throw new Error("Created fail!");
    }
    res.json({
      message: "Create successfully!",
    });
  } catch (error) {
    next(error);
  }
});
const update = asyncHandler(async (req, res, next) => {
  try {
    const { name, contact, address } = req.body;
    const id = req.params.id;
    const file = req.file;
    let image = null;
    const queryCheck2 = "select * from customers where id = ?";
    const check2 = await executeQuery(queryCheck2, [id]);
    if (check2.length === 0) {
      res.status(400);
      throw new Error("ID not found!");
    }
    if (file) {
      image = file.filename;
    }
    if (!name) {
      res.status(400);
      throw new Error("Please input name!");
    }
    const queryCheck = "select name from customers where name = ? AND id != ?";
    const check = await executeQuery(queryCheck, [name, id]);
    if (check.length > 0) {
      res.status(409);
      throw new Error("This customer is exist!");
    }
    const updateCustomer =
      "update customers set name = ?, contact = ?, address = ?, image = ? where id = ?";
    const create = await executeQuery(updateCustomer, [
      name,
      contact,
      address,
      image,
      id,
    ]);
    if (create.affectedRows === 0) {
      res.status(400);
      throw new Error("Updated fail!");
    }
    res.json({
      message: "Update successfully!",
    });
  } catch (error) {
    next(error);
  }
});
const remove = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400);
      throw new Error("Please input ID!");
    }
    const queryCheck = "select * from customers where id = ?";
    const check = await executeQuery(queryCheck, [id]);
    if (check.length === 0) {
      res.status(400);
      throw new Error("ID not found!");
    }
    const deleteCustomer = "delete from customers where id = ?";
    const remove = await executeQuery(deleteCustomer, [id]);
    if (remove.affectedRows === 1) {
      res.json({
        message: "Customer type deleted sucessufully!",
      });
    } else {
      res.status(500);
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
};
