const db = require("../config/db");
const executeQuery = db.executeQuery;
const currentDate = require("../utils/currentDate");
const asyncHandler = require("express-async-handler");


const createReceiveproducts = asyncHandler(async (req, res, next) => {
    try {
        const { product_id, quantity, purchase_price, unit_price, product_price, special_price, supplier_id, user_id } = req.body;
        if (!product_id) {
            res.status(400);
            throw new Error("Please input product_id");
        }
        if (!supplier_id) {
            res.status(400);
            throw new Error("Please input supplier_id");
        }
        if (!user_id) {
            res.status(400);
            throw new Error("Please input user_id");
        }
        const queryCheckProduct = "select * from products where id = ?";
        const checkProduct = await executeQuery(queryCheckProduct, [product_id]);
        if (checkProduct.length === 0) {
            res.status(400);
            throw new Error("ID product not found!");
        }
        const queryCheckSupplier = "select * from suppliers where id = ?";
        const checkSupplier = await executeQuery(queryCheckSupplier, [supplier_id]);
        if (checkSupplier.length === 0) {
            res.status(400);
            throw new Error("ID supplier not found!");
        }
        const queryCheckuser = "select * from users where id = ?";
        const checkUser = await executeQuery(queryCheckuser, [user_id]);
        if (checkUser.length === 0) {
            res.status(400);
            throw new Error("ID user not found!");
        }
        const new_sub_total = quantity * purchase_price;
        const queryCreate = "insert into receiveproducts (product_id, quantity, purchase_price, unit_price, product_price, special_price, sub_total, supplier_id, user_id) values (?,?,?,?,?,?,?,?,?)";
        const values = [product_id, quantity, purchase_price, unit_price, product_price, special_price, new_sub_total, supplier_id, user_id];
        const create = await executeQuery(queryCreate, values);
        if (create.affectedRows > 0) {
            res.json({
                message: "Receiveproduct created successfully!"
            })
        } else {
            res.status(500);
        }
    } catch (error) {
        next(error);
    }
})

const getListReceiveproducts = asyncHandler(async (req, res, next) => {
    try {
        const queryGetList = "select * from receiveproducts";
        const getList = await executeQuery(queryGetList);
        res.json({
            receiveproducts: getList
        })
    } catch (error) {
        next(error);
    }
})

const updateReceiveproducts = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const { product_id, quantity, purchase_price, unit_price, product_price, special_price, supplier_id, user_id } = req.body;
        if (!product_id) {
            res.status(400);
            throw new Error("Please input product_id");
        }
        if (!supplier_id) {
            res.status(400);
            throw new Error("Please input supplier_id");
        }
        if (!user_id) {
            res.status(400);
            throw new Error("Please input user_id");
        }
        if(!Number.isInteger(product_id) || !Number.isInteger(supplier_id) || !Number.isInteger(user_id)){
            res.status(400);
            throw new Error("All foriegn keys must me number!");
        }
        const queryCheck = "select * from receiveproducts where id = ?";
        const check = await executeQuery(queryCheck, [id]);
        if (check.length === 0) {
            res.status(400);
            throw new Error("ID not found!");
        }
        const queryCheckProduct = "select * from products where id = ?";
        const checkProduct = await executeQuery(queryCheckProduct, [product_id]);
        if (checkProduct.length === 0) {
            res.status(400);
            throw new Error("ID product not found!");
        }
        const queryCheckSupplier = "select * from suppliers where id = ?";
        const checkSupplier = await executeQuery(queryCheckSupplier, [supplier_id]);
        if (checkSupplier.length === 0) {
            res.status(400);
            throw new Error("ID supplier not found!");
        }
        const queryCheckuser = "select * from users where id = ?";
        const checkUser = await executeQuery(queryCheckuser, [user_id]);
        if (checkUser.length === 0) {
            res.status(400);
            throw new Error("ID user not found!");
        }
        const sub_total = quantity * purchase_price;
        const queryUpdate = "update receiveproducts set product_id = ?, quantity = ?, purchase_price = ?, unit_price = ?, product_price = ?, special_price = ?, sub_total= ?, supplier_id = ?, user_id = ?, updated_date = ? where id = ?";
        const values = [product_id, quantity, purchase_price, unit_price, product_price, special_price, sub_total, supplier_id, user_id, currentDate, id];
        const update = await executeQuery(queryUpdate,values);
        if(update.affectedRows > 0 ){
            res.json({
                message : "Receiveproduct updated successfully!"
            })
        }else{
            res.status(500);
        }

    } catch (error) {
        next(error);
    }
})

const deleteReceiveproducts = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const queryCheck = "select * from receiveproducts where id = ?";
        const check = await executeQuery(queryCheck,[id]);
        if(check.length === 0){
            res.status(400);
            throw new Error("ID not found!");
        }
        const queryRemove = "delete from receiveproducts where id = ?";
        const remove = await executeQuery(queryRemove,[id]);
        if(remove){
            res.json({
                message : "Receiveproduct deleted successfully!"
            })
        }else{
            res.status(500);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = {
    createReceiveproducts,
    getListReceiveproducts,
    updateReceiveproducts,
    deleteReceiveproducts
}
