const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const executeQuery = db.executeQuery;
const getReilCurrency = asyncHandler(async (req, res, next) => {
  const getQuery = "select riel from exchangerate where id = 1";
  const get = await executeQuery(getQuery);
  res.json({
    data: get,
  });
});
const update = asyncHandler(async (req, res, next) => {
  try {
    const khmerCurrency = req.body.riel;
    const riel = khmerCurrency * 1;
    if (!riel || riel <= 0) {
      res.status(400);
      throw new Error("Please input Riel!");
    }
    const updateQuery = "update exchangerate set riel = ? where id = 1";
    await executeQuery(updateQuery, riel);
    res.json({
      message: "Update successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getReilCurrency,
  update,
};
