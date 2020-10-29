const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required:false
 
  },
  urgent: {
    type: Boolean,
  },
  content: {
    type: String,
    required: true,
  },
  filesData: {
    type: Array,
    required: false,
  },
  closeDate: {
    type: String,
    required: false,
    default: "OPEN",
  },
});
module.exports = mongoose.model("job", JobSchema);
