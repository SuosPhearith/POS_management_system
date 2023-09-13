const db = require("../config/db");
const executeQuery = db.executeQuery;
const currentDate = require("../utils/currentDate");
const asyncHandler = require("express-async-handler");

const getList = asyncHandler(async (req, res, next)=>{
    try {
        const getListPaymenttype = "select * from paymenttypes";
        const getList = await executeQuery(getListPaymenttype);
        res.json({
            sales : getList
        })
    } catch (error) {
        next(error);
    }
})
const create = asyncHandler(async (req, res, next)=>{
    try {
        const {name , description} = req.body;
        if(!name){
            res.status(400);
            throw new Error("Please input name!");
        }
        const queryCheck = "select name from paymentTypes where name = ?";
        const check = await executeQuery(queryCheck,[name]);
        if(check.length > 0){
            res.status(409);
            throw new Error("This payment is exist!");
        }
        const createPaymenttype = "insert into paymentTypes (name, description) values (?,?)";
        const create = await executeQuery(createPaymenttype,[name, description]);
        if(create.affectedRows === 0){
            res.status(400);
            throw new Error("Created fail!");
        }
        res.json({
            message : "Create successfully!"
        })
    } catch (error) {
        next(error);
    }
})
const update = asyncHandler(async (req, res, next)=>{
    try {
        const {name , description} = req.body;
        const id = req.params.id;
        if(!name){
            res.status(400);
            throw new Error("Please input name!");
        }
        const queryCheck = "select name from paymentTypes where name = ? AND id != ?";
        const check = await executeQuery(queryCheck,[name,id]);
        if(check.length > 0){
            res.status(409);
            throw new Error("This payment is exist!");
        }
        const updatePaymentType = "update paymentTypes set name = ?, description = ? where id = ?";
        const create = await executeQuery(updatePaymentType,[name, description, id]);
        if(create.affectedRows === 0){
            res.status(400);
            throw new Error("Updated fail!");
        }
        res.json({
            message : "Update successfully!"
        })
    } catch (error) {
        next(error);
    }
})
const remove = asyncHandler(async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id){
            res.status(400);
            throw new Error("Please input ID!");
        }
        const queryCheck = "select * from paymentTypes where id = ?";
        const check = await executeQuery(queryCheck,[id]);
        if(check.length === 0 ){
            res.status(400);
            throw new Error("ID not found!");
        }
        const deletePaymentType = "delete from paymentTypes where id = ?";
        const remove = await executeQuery(deletePaymentType,[id]);
        if(remove.affectedRows === 1){
            res.json({
                message : "Payment type deleted sucessufully!"
            })
        }else{
            res.status(500);
        }
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