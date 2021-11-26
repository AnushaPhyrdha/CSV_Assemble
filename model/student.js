const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  student_name: { type: "string", require: true },
  roll_number: { type: "number", unique: true, require: true },
  study: { type: "number", require: true },
  father_name: { type: "string", require: true },
  mother_name: { type: "string", require: true },
  address: { type: "string" },
  marks: { type: "number" },
  rank: { type: "number" },
});

const Student = mongoose.model("Student", PostSchema);

module.exports = Student;
