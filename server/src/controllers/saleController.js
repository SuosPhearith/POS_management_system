const db = require("../config/db");
const executeQuery = db.executeQuery;
const currentDate = require("../utils/currentDate");
const asyncHandler = require("express-async-handler");

const getList = asyncHandler(async (req, res, next)=>{
    try {
        const getListSales = "select * from invoices";
        const getList = await executeQuery(getListSales);
        res.json({
            sales : getList
        })
    } catch (error) {
        next(error);
    }
})
const create = asyncHandler(async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(error);
    }
})
const update = asyncHandler(async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(error);
    }
})
const remove = asyncHandler(async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(error);
    }
})

module.exports ={
    getList,
    create,
    update,
    remove
}