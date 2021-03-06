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
    type: String,
    required:true,
    default:'off'
  },
  content: {
    type: String,
    required: true,
  },
  filesData: {
    type: Array,
    required: false,
  },
  status: {
      type:String,
      required: true,
      default: "NEW"
  },
  contractor:{
      type: mongoose.Schema.Types.ObjectId,
      default: "NOT ASSIGNED",
      ref:'users'
  },
  closeDate: {
    type: String,
    required: false,
    default: "OPEN",
  },
  lastUpdate: {
    type: Object,
    required: true,
    default: {"by":"system","date":Date.now()}
  },
  updates: {
    type:Array,
    required: true,
    default: []
  },
  closingNote: {
    type:String,
    required: true,
    default: 'This Job is open'
  },
});
module.exports = mongoose.model("job", JobSchema);
