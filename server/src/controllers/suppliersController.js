const db = require("../config/db");
const executeQuery = db.executeQuery;
const currentDate = require("../utils/currentDate");
const asyncHandler = require("express-async-handler");

const createSupplier = asyncHandler(async (req, res, next) => {
    try {
        const { code, name, contact, address, email } = req.body;
        const file = req.file;
        let image = null;
        if(file){
            image = file.filename;
        }
        if (!name) {
            res.status(400);
            throw new Error("Please input name!");
        }
        if (!code) {
            res.status(400);
            throw new Error("Please input code!");
        }
        const queryCheckSame = "select * from suppliers where code = ?";
        const checkSame = await executeQuery(queryCheckSame,[code]);
        if(checkSame.length > 0){
            res.status(400);
            throw new Error("Supplier code is exist!");
        }
        const queryCreate = "insert into suppliers (code, name, contact, address, email, image) values (?,?,?,?,?,?)";
        const values = [code, name, contact, address, email, image];
        const create = await executeQuery(queryCreate, values);
        if (create.affectedRows === 1) {
            res.json({
                message: "Supplier created successfully!"
            })
        } else {
            res.status(500);
        }
    } catch (error) {
        next(error);
    }
})

const getListSupplier = asyncHandler(async (req, res, next) => {
    try {
        const queryGetList = "select * from suppliers";
        const getList = await executeQuery(queryGetList);
        res.json({
            suppliers: getList
        })
    } catch (error) {
        next(error);
    }
})

const updateSupplier = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const queryCheck = "select * from suppliers where id = ?";
        const check = await executeQuery(queryCheck, [id]);
        if (check.length === 0) {
            res.status(400);
            throw new Error("ID not found!");
        }
        const { code, name, contact, address, email } = req.body;
        const file = req.file;
        let image = null;
        if(file){
            image = file.filename;
        }else {
            // If no new file is provided, retrieve the existing image from the database
            const queryGetImage = "SELECT image FROM suppliers WHERE id = ?";
            const result = await executeQuery(queryGetImage, id);
            if (result.length > 0) {
                image = result[0].image;
            }
        }
        if (!name) {
            res.status(400);
            throw new Error("Please input name!");
        }
        if (!code) {
            res.status(400);
            throw new Error("Please input code!");
        }
        const queryCheckSame = "select * from suppliers where code = ? and id != ?";
        const checkSame = await executeQuery(queryCheckSame,[code,id]);
        if(checkSame.length > 0){
            res.status(400);
            throw new Error("Supplier code is exist!");
        }
        const queryUpdate = "update suppliers set code = ?, name = ?, contact = ?, address = ?, email = ?, image = ?, updated_date = ? where id = ?";
        const values = [code, name, contact, address, email, image, currentDate, id];
        const update = await executeQuery(queryUpdate, values);
        if (update.affectedRows > 0) {
            res.json({
                message: "Supplier updated successfully!"
            })
        } else {
            res.status(500);
        }

    } catch (error) {
        next(error);
    }
})

const deleteSupplier = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const queryCheck = "select * from suppliers where id = ?";
        const check = await executeQuery(queryCheck, [id]);
        if (check.length === 0) {
            res.status(400);
            throw new Error("ID not found!");
        }
        const queryDelete = "delete from suppliers where id = ?";
        const remove = await executeQuery(queryDelete, [id]);
        if (remove) {
            res.json({
                message : "Suppliers created successfully!"
            });
        }else{
            res.status(500);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = {
    createSupplier,
    getListSupplier,
    updateSupplier,
    deleteSupplier
}