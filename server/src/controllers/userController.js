
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
            users: users,
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
        if (user.length > 0) {
            res.json({
                user: user
            })
        } else {
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
        const { fullname, username, password, contact, role } = req.body;
        const file = req.file;
        let image = null;
        if (file) {
            image = file.filename;
        }
        console.log(username)
        if (!fullname || !username || !password || !contact || !('role' in req.body)) {
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
        const queryCheckRole = "select * from roles where id = ?";
        const check = await executeQuery(queryCheckRole, [role]);
        if (check.length === 0) {
            res.status(400);
            throw new Error("Role ID not found!");
        }
        const hashPassword = await bcrypt.hash(password, 10);
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
        const { fullname, username, contact } = req.body;
        let role = req.body.role;
        const file = req.file;
        let image = null;
        if(id === '1' || id === 1){
            role = "1";
        }
        if (file) {
            image = file.filename;
        }else {
            // If no new file is provided, retrieve the existing image from the database
            const queryGetImage = "SELECT image FROM users WHERE id = ?";
            const result = await executeQuery(queryGetImage, id);
            if (result.length > 0) {
                image = result[0].image;
            }
        }
        const queryCheck = "select * from users where id = ?";
        const isExist = await executeQuery(queryCheck, id);
        if (isExist.length === 0) {
            res.status(400);
            throw new Error("Username not found!");
        }
        if (!fullname || !username || !contact || !role) {
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
        const queryCheckUsername = "SELECT id FROM users WHERE username = ? AND id != ?";
        const existingUser = await executeQuery(queryCheckUsername, [username, id]);
        if (existingUser.length > 0) {
            res.status(409);
            throw new Error("Username is already taken by another user");
        }
        const queryUpdate = "update users set username = ?, fullname = ?, contact = ?, role_id = ?, image = ?, updated_date = ? where id = ?";
        const values = [username, fullname, contact, role, image, currentDate, id];
        const update = await executeQuery(queryUpdate, values);
        if (update.affectedRows === 1) {
            res.json({
                message: "User updated successfully!"
            })
        } else {
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

const userDelete = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const queryCheck = "select * from users where id = ?";
        const isExist = await executeQuery(queryCheck, id);
        if (isExist.length === 0) {
            res.status(400);
            throw new Error("Username not found!");
        }
        if (id === "1") {
            res.status(400);
            throw new Error("Cannot delete super admin!");
        }
        const queryDelete = "delete from users where id = ?";
        const remove = await executeQuery(queryDelete, [id]);
        if (remove.affectedRows === 1) {
            res.json({
                message: "User deleted successfully!"
            })
        } else {
            res.status(500);
            throw new Error("deleted failed!");
        }
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
        if (!profile) {
            res.status(500);
        } else {
            res.json({
                profile: profile
            })
        }
    } catch (error) {
        next(error);
    }
})

const resetPassword = asyncHandler(async (req, res, next) => {
    try {
        const {password, confirmPassword} = req.body;
        const id = req.params.id;
        if(!password || !confirmPassword || !id){
            res.status(400);
            throw new Error("Please input all fields!");
        }
        const queryCheck = "select * from users where id = ?";
        const check = await executeQuery(queryCheck,id);
        if(check.length === 0){
            res.status(400);
            throw new Error("ID not found!");
        }
        if(password.length < 6){
            res.status(400);
            throw new Error("Password is too short!");
        }
        if(password !== confirmPassword){
            res.status(400);
            throw new Error("Confirm password incorrect!")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const queryUpdate = "update users set password = ? where id = ?";
        const update = await executeQuery(queryUpdate,[hashPassword,id]);
        if(update.affectedRows > 0){
            res.json({
                message : "Updated successfully!"
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
    getListProfile,
    resetPassword
}