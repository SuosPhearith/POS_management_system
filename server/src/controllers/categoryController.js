const db = require("../config/db");
const executeQuery = db.executeQuery;
const asyncHandler = require("express-async-handler");
const currentDate = require("../utils/currentDate");

const getListCategory = asyncHandler (async (req, res, next)=>{
    try {
        const query = "select * from categories order by sort_order";
        const categories = await executeQuery(query);
        res.json({
            categories : categories
        })
    } catch (error) {
        next(error);
    }
})

const createCategory = asyncHandler (async (req, res, next)=>{
    try {
        const {name, parent_id, description, sort_order} = req.body;
        let order = sort_order;
        if(!sort_order || sort_order === 0 ){
            const maxOrder = "SELECT MAX(sort_order) as biggest FROM categories";
            const queryMaxOrder = await executeQuery(maxOrder);
            order = queryMaxOrder[0].biggest + 1;
        }
        const file = req.file;
        let image = null;
        if(file){
            image = file.filename;
        }
        if(!name){
            res.status(400);
            throw new Error("Please input name!");
        }
        const queryCheck = "select * from categories where name = ?";
        const isExist = await executeQuery(queryCheck,name);
        if(isExist.length > 0){
            res.status(400);
            throw new Error("This category is exist!");
        }
        const queryCreate = "insert into categories (name, parent_id, description, sort_order, image) values (?, ?, ?, ?, ?)";
        const values = [name, parent_id, description, order, image];
        const create = await executeQuery(queryCreate,values);
        if(create.affectedRows === 1){
            res.json({
                message : "Category created successfully!"
            })
        }else{
            res.status(500);
        }
    } catch (error) {
        next(error);
    }
})

const updateCategory = asyncHandler (async (req, res, next)=>{
    try {
        const id = req.params.id;
        const {name, parent_id, description, sort_order} = req.body;
        const file = req.file;
        let image = null;
        if(file){
            image = file.filename;
        }else {
            // If no new file is provided, retrieve the existing image from the database
            const queryGetImage = "SELECT image FROM categories WHERE id = ?";
            const result = await executeQuery(queryGetImage, id);
            if (result.length > 0) {
                image = result[0].image;
            }
        }
        if(!name){
            res.status(400);
            throw new Error("Please input name!");
        }
        const queryCheckId = "select * from categories where id = ?";
        const isExistID = await executeQuery(queryCheckId,[id]);
        if(isExistID.length === 0){
            res.status(400);
            throw new Error("ID not found!");
        } 
        const queryCheck = "select * from categories where name = ? and id != ?";
        const isExist = await executeQuery(queryCheck,[name, id]);
        if(isExist.length > 0){
            res.status(400);
            throw new Error("Error this name is exist!");
        }
        const queryUpdate = "update categories set name = ?, parent_id = ?, description = ?, sort_order = ?, image = ?, updated_date = ? where id = ?";
        const values = [name, parent_id, description, sort_order, image, currentDate, id];
        const update = await executeQuery(queryUpdate,values);
        if(update.affectedRows === 1){
            res.json({
                message : "Category updated successfully!"
            })
        }else{
            res.status(500);
        }
    } catch (error) {
        next(error);
    }
})

const deleteCategory = asyncHandler (async (req, res, next)=>{
    try {
        const id = req.params.id;
        const queryCheckId = "select * from categories where id = ?";
        const isExistID = await executeQuery(queryCheckId,[id]);
        if(isExistID.length === 0){
            res.status(400);
            throw new Error("ID not found!");
        }
        const queryRemove = "delete from categories where id = ?";
        const remove = await executeQuery(queryRemove,[id]);
        if(remove.affectedRows === 1){
            res.json({
                message : "Category deleted sucessufully!"
            })
        }else{
            res.status(500);
        }
        
    } catch (error) {
        next(error);
    }
})

module.exports = {
    getListCategory,
    createCategory,
    updateCategory,
    deleteCategory
}