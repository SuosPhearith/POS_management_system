const bcrypt = require("bcrypt");
const { raw, json } = require("express");
const db = require("../config/db");
const executeQuery = db.executeQuery;
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const currentDate = require("../utils/currentDate");

const login = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const querycheck = "select * from users where username = ?";
    // const querycheck = "select * from users where username = " + username;
    const user = await executeQuery(querycheck, [username]);
    if (user.length === 0) {
      res.status(400);
      throw new Error("Username does not exist!");
    }
    const queryOnlyOne =
      "select * from users where username = ? and is_active = 1";
    const checkOnlyOne = await executeQuery(queryOnlyOne, [username]);
    if (checkOnlyOne.length > 0) {
      res.status(400);
      throw new Error("Accuont can loggin only once device!");
    }
    const isCorrect = await bcrypt.compare(password, user[0].password);
    if (!isCorrect) {
      res.status(400);
      throw new Error("Incorrect password!");
    }

    const queryActive = "update users set is_active = 1 where username = ?";
    await executeQuery(queryActive, [username]);
    delete user[0].password;

    const access_token = jwt.sign(user[0], process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refresh_token = jwt.sign(user[0], process.env.JWT_REFRESH_KEY);

    res.json({
      access_token: access_token,
      refresh_token: refresh_token,
    });
  } catch (error) {
    next(error);
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    const username = req.body.username;
    if (!username) {
      res.status(400);
      throw new Error("Can not found username for logout!");
    }
    const checkLogout = "select * from users where username = ?";
    const doLogout = await executeQuery(checkLogout, [username]);
    if (doLogout.length === 0) {
      res.status(400);
      throw new Error("Can not logout rigth now!");
    }
    const queryLogout = "update users set is_active = 0 where username = ?";
    await executeQuery(queryLogout, [username]);
    res.json({
      message: "Loggout successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const refresh = asyncHandler(async (req, res, next) => {
  try {
    const refresh_token = req.body.refresh_token;
    if (!refresh_token) {
      res.status(400);
      throw new Error("Refresh token not provided!");
    }
    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_KEY,
      async (err, result) => {
        try {
          if (err) {
            res.status(403);
            throw new Error("Invalid refresh token");
          } else {
            const querycheck = "select * from users where id = ?";
            const user = await executeQuery(querycheck, [result.id]);
            if (user.length === 0) {
              res.status(400);
              throw new Error("Username does not exist!");
            }
            delete user[0].password;

            const access_token = jwt.sign(user[0], process.env.JWT_SECRET_KEY, {
              expiresIn: "15m",
            });
            const refresh_token = jwt.sign(
              user[0],
              process.env.JWT_REFRESH_KEY
            );

            res.json({
              access_token: access_token,
              refresh_token: refresh_token,
            });
          }
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = {
  login,
  logout,
  refresh,
};
