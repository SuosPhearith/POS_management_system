const express = require('express');
const router = express.Router();
const {
    getListUser,
    getListUsers,
    userDelete,
    userRegister,
    userUpdate,
    userLogin,
    userLogout,
    getListProfile
} = require('../controllers/userController')

const authenticateToken = require('../middleware/authenticateToken');
const roles = require('../utils/roles');


router.get("/",authenticateToken([roles.admin]), getListUsers)

router.get("/profile",authenticateToken([roles.admin,roles.saler,roles.manager]), getListProfile)

router.get("/:id",authenticateToken([roles.admin]),getListUser)

router.post("/register",authenticateToken([roles.admin]),userRegister)

router.put("/update/:id",authenticateToken([roles.admin]),userUpdate)

router.delete("/delete/:id",authenticateToken([roles.admin]),userDelete)

router.post("/logout",authenticateToken([roles.admin,roles.saler,roles.manager]),userLogout)

router.post("/login",userLogin)



module.exports = router