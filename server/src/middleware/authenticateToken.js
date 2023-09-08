
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authenticateToken = requiredRoles =>  asyncHandler( async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            res.status(401);
            throw new Error("User is not authorized");
        }
        if (!requiredRoles.includes(user.role_id)){
            res.status(401);
            throw new Error("User is not authorized");
        }
        req.user = user;
        next();
    })
    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
})

module.exports = authenticateToken;