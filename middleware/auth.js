const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const secret_token = "anhbdfhyudflnssdnubfbjshdufv";

const User = require("../model/user");

const Auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "must login in a moment" });
  }
  const token = authorization.replace("Bearer ", "");
  await jwt.verify(token, secret_token, (err, payload) => {
    if (err) {
      console.log(token);
      return res.status(401).json({ error: "must login in few seconds" });
    }
    const { _id } = payload;
    User.find({ _id }).then((data) => {
      req.user = data;
      next();
    });
  });
};

module.exports = Auth;
