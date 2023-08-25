
const bcrypt = require('bcrypt');
const { raw, json } = require("express");
const db = require("../config/db");
const executeQuery = db.executeQuery;
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const currentDate = require('../utils/currentDate');


// description getlist user
// route "/api/users/getList"
// public
const getListUsers = asyncHandler(async (req, res, next) => {
    try {
        const query = "select * from users";
        const users = await executeQuery(query);
        res.json({
            users : users,
        })
    } catch (error) {
        next(error);
    }
})


// description getlist user
// route "/api/users/getList/:id"
// public
const getListUser = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const query = "select * from users where id = ?";
        const user = await executeQuery(query, id);
        if(user.length > 0){
            res.json({
                user : user
            })
        }else{
            res.status(400);
            throw new Error("User not found!");
        }
        
    } catch (error) {
        next(error);
    }
})


// description create user
// route "/api/users/register"
// public

const userRegister = asyncHandler(async (req, res, next) => {
    try {
        const { fullname, username, password, contact, role, image } = req.body;
        if (!fullname || !username || !password || !contact || !role) {
            res.status(400);
            throw new Error("All fields are require!");
        }
        if (fullname.length < 3) {
            res.status(400);
            throw new Error("Fullname is too short!");
        }
        if (username.length < 8) {
            res.status(400);
            throw new Error("Username is too short!");
        }
        if (password.length < 3) {
            res.status(400);
            throw new Error("Password is too short!");
        }
        const queryCheck = "select * from users where username = ?";
        const checkUsername = await executeQuery(queryCheck, [username]);
        if (checkUsername.length > 0) {
            res.status(409);
            throw new Error("Username is already exist!");
        }
        const hashPassword = await bcrypt.hash(password,10);
        const queryCreate = "insert into users (username, password, fullname, contact, role_id, image) values (?,?,?,?,?,?)";
        const values = [username, hashPassword, fullname, contact, role, image];
        const create = await executeQuery(queryCreate, values);
        if (create.affectedRows === 1) {
            res.status(201).json({
                message: "User created successfully"
            })
        } else {
            res.status(500);
            throw new Error("User created failed!");
        }
    } catch (error) {
        next(error);
    }
})


// description update user
// route "/api/users/update/:id"
// public

const userUpdate = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const { fullname, username, password, contact, role, image } = req.body;
        const queryCheck = "select * from users where id = ?";
        const isExist = await executeQuery(queryCheck,id);
        if(isExist.length === 0){
            res.status(400);
            throw new Error("Username not found!");
        }
        if (!fullname || !username || !password || !contact || !role) {
            res.status(400);
            throw new Error("All fields are require!");
        }
        if (fullname.length < 3) {
            res.status(400);
            throw new Error("Fullname is too short!");
        }
        if (username.length < 8) {
            res.status(400);
            throw new Error("Username is too short!");
        }
        if (password.length < 3) {
            res.status(400);
            throw new Error("Password is too short!");
        }
        const queryCheckUsername = "SELECT id FROM users WHERE username = ? AND id != ?";
        const existingUser = await executeQuery(queryCheckUsername, [username, id]);
        if (existingUser.length > 0) {
            res.status(409);
            throw new Error("Username is already taken by another user");
        }
        const hashPassword = await bcrypt.hash(password,10);
        const queryUpdate = "update users set username = ?, password = ?, fullname = ?, contact = ?, role_id = ?, image = ?, updated_date = ? where id = ?";
        const values = [username, hashPassword, fullname, contact, role, image, currentDate, id];
        const update = await executeQuery(queryUpdate,values);
        if(update.affectedRows === 1){
            res.json({
                message: "User updated successfully!"
            })
        }else{
            res.status(500);
            throw new Error("Fail updated!!");
        }
    } catch (error) {
        next(error);
    }
})


// description delete user
// route "/api/users/delete/:id"
// public

const userDelete = asyncHandler( async (req, res, next) => {
    try {
        const id = req.params.id;
        const queryCheck = "select * from users where id = ?";
        const isExist = await executeQuery(queryCheck,id);
        if(isExist.length === 0){
            res.status(400);
            throw new Error("Username not found!");
        }
        if(id === "1"){
            res.status(400);
            throw new Error("Cannot delete super admin!");
        }
        const queryDelete = "delete from users where id = ?";
        const remove = await executeQuery(queryDelete,[id]);
        if(remove.affectedRows === 1){
            res.json({
                message : "User deleted successfully!"
            })
        }else{
            res.status(500);
            throw new Error("deleted failed!");
        }
    } catch (error) {
        next(error);
    }
})

const userLogin = asyncHandler(async (req, res, next)=>{
    try {
        const {username, password} = req.body;
        const querycheck = "select * from users where username = ?";
        const user = await executeQuery(querycheck,[username]);
        if(user.length === 0){
            res.status(400);
            throw new Error("Username does not exist!");
        }
        const queryOnlyOne = "select * from users where username = ? and is_active = 1";
        const checkOnlyOne = await executeQuery(queryOnlyOne,[username]);
        if(checkOnlyOne.length > 0){
            res.status(400);
            throw new Error("Accuont can loggin only once divice!");
        }
        const isCorrect = await bcrypt.compare(password, user[0].password);
        if(!isCorrect){
            res.status(400);
            throw new Error("Incorrect password!");
        }

        const queryActive = "update users set is_active = 1 where username = ?";
        await executeQuery(queryActive,[username]);
        delete user[0].password;

        jwt.sign(user[0],process.env.JWT_SECRET_KEY,(err,token)=>{
            if(err){
                res.status(500);
            }
            res.json({
                token : token
            })
        })

    } catch (error) {
        next(error);
    }
})

const userLogout = asyncHandler(async(req, res, next)=>{
    try {
        const username = req.body.username;
        if(!username){
            res.status(400);
            throw new Error("Can not found username for logout!");
        }
        const querycheck = "select * from users where username = ? and is_active = 1";
        const user = await executeQuery(querycheck,[username]);
        if(user.length === 0){
            res.status(400);
            throw new Error("Please login account first!");
        }
        const queryLogout = "update users set is_active = 0 where username = ?";
        await executeQuery(queryLogout,[username]);
        res.json({
            message : "Loggout successfully!"
        })
    } catch (error) {
        next(error);
    }
})

// description getlist user
// route "/api/users/profile"
// public
const getListProfile = asyncHandler(async (req, res, next) => {
    try {
        const profile = req.user;
        if(!profile){
            res.status(500);
        }else{
            res.json({
                profile : profile
            })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = {
    getListUsers,
    getListUser,
    userDelete,
    userRegister,
    userUpdate,
    userLogin,
    userLogout,
    getListProfile
}