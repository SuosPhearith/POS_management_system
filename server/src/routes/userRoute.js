const express = require('express');
const router = express.Router();
const {
    getListUser,
    getListUsers,
    userDelete,
    userRegister,
    userUpdate,
    getListProfile,
    resetPassword
} = require('../controllers/userController')

const authenticateToken = require('../middleware/authenticateToken');
const roles = require('../utils/roles');
const upload = require('../middleware/upload');


router.get("/getList",authenticateToken([roles.admin]), getListUsers)

router.get("/profile",authenticateToken([roles.admin,roles.seller,roles.manager]), getListProfile)

router.get("/:id",authenticateToken([roles.admin]),getListUser)

router.post("/register",authenticateToken([roles.admin]), upload.single('file'), userRegister)

router.put("/update/:id",authenticateToken([roles.admin]), upload.single('file'), userUpdate)

router.put("/resetPassword/:id",authenticateToken([roles.admin]), resetPassword)

router.delete("/delete/:id",authenticateToken([roles.admin]),userDelete)



module.exports = router