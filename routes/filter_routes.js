const express = require("express");
const Student = require("../model/student");
const mongoose = require("mongoose");
const router = express.Router();

//Filter by query and return the output
router.get("/get/filter", async function (req, res) {
  try {
    const { condition, projection } = req.body;
    const students = await Student.find(condition, projection);
    return res.json({
      status: "success",
      data: {
        students,
      },
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

router.put("/update/filter", async function (req, res) {
  try {
    const { condition, projection } = req.body;
    const students = await Student.updateMany(condition, projection);
    return res.json({
      status: "success",
      data: {
        students,
      },
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

router.delete("/delete/filter", async function (req, res) {
  try {
    const { condition, projection } = req.body;
    const students = await Student.deleteMany(condition, projection);
    return res.json({
      status: "success",
      data: {
        students,
      },
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;
