const express = require("express");
const Student = require("../model/student");
const mongoose = require("mongoose");
const router = express.Router();
const csv = require("csvtojson");
const Require_auth = require("../middleware/auth");
const file_name =
  "D://BootCamp/OneAssure_Assignment/BackEnd/routes/student.csv";

var csv_data = [];
csv()
  .fromFile(file_name)
  .then((data) => {
    for (var i = 0; i < data.length; i++) {
      var eachstudent = {
        student_name: data[i]["student_name"],
        roll_number: data[i]["roll_number"],
        study: data[i]["study"],
        father_name: data[i]["father_name"],
        mother_name: data[i]["mother_name"],
        address: data[i]["address"],
        marks: data[i]["marks"],
        rank: data[i]["rank"],
      };
      csv_data.push(eachstudent);
    }

    // to push the CSV file data to Database
    router.post("/post", async function (req, res) {
      await Student.insertMany(csv_data, (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log("Data Inserted successfully");
        }
        res.json({
          status: "success",
        });
      });
    });
  });

//To get all the exiting student records in the DB
router.get("/get", async function (req, res) {
  try {
    const posts = await Student.find();
    return res.json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

//To update a single record and field using the id
router.put("/put/:id", async function (req, res) {
  const { address } = req.body;
  const student = await Student.findOne({ _id: req.params.id });
  console.log(student.user, req.user);

  if (!student) {
    return res.status(404).json({
      status: "failed",
      message: "student Not Found",
    });
  }

  // if (String(student.user) !== req.user) {
  //   return res.status(403).json({
  //     status: "failed",
  //     message: "Forbidden",
  //   });
  // }

  await Student.updateOne(
    { _id: req.params.id },
    {
      address,
    }
  );

  res.json({
    status: "success",
  });
});

//To delete a single student record using the id
router.delete("/delete/:id", async function (req, res) {
  const post = await Student.findOne({ _id: req.params.id });
  if (!post) {
    return res.status(404).json({
      status: "failed",
      message: "Post Not Found",
    });
  }

  // if (String(post.user) !== req.user) {
  //   return res.status(403).json({
  //     status: "failed",
  //     message: "Forbidden",
  //   });
  // }

  await Student.deleteOne({ _id: req.params.id });

  res.json({
    status: "success",
  });
});

module.exports = router;
