const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");


const Job = require("../models/Job");
const User = require("../models/User");

// @desc  GET USERS JOBS

// @route GET api/jobs
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user.id)
    const jobs = await Job.find({ owner: req.user.id }).sort({ date: -1 });
    res.json(jobs);
    console.log(jobs.data)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @desc  ADD NEW JOB

// @route POST api/jobs
// @access  Private

router.post(
  "/",
  [auth, [
      check("title", "Name is Required").not().isEmpty(),
      check("content", "Please provide a description of the job.").not().isEmpty(),
    check('dueDate',"You must select a due date.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, dueDate, content, filesData, contractor } = req.body;
    console.log(contractor)
    let fullContractor = await User.findById(contractor)

    try {
      newJob = new Job({
        owner: req.user.id, title, dueDate, content, filesData, fullContractor
      });

      const job = await newJob.save();

      res.json(job);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route POST api/contacts/:id
// @desc  Add new user contact
// @access  Private
router.put("/:id", auth, async (req, res) => {

  const { title, contractor, lastUpdate, status, urgent, dueDate, content, filesData, closeDate } = req.body;

  // Build contact object
  const jobFields = {};
  if (title) jobFields.title = title;
  if (content) jobFields.content = content;
  if (filesData) jobFields.filesData = filesData;
  // if (links) jobFields.links = links;
  if (dueDate) jobFields.dueDate = dueDate;
  if (lastUpdate) jobFields.lastUpdate = lastUpdate;
  if (contractor) jobFields.contractor = contractor;
  if (status) jobFields.status = status;
  if (closeDate) jobFields.closeDate = closeDate;
  if (urgent) jobFields.urgent = urgent;

  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Make contact is users contact
    // if (job.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "Not Authorized" });
    // }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );
    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/contacts/:id
// @desc  Add new user contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Make validation later
    // if (job.user.toString() !== req.user._id) {
    //   return res.status(401).json({ msg: "Not Authorized" });
    // }

    await Job.findByIdAndRemove(req.params.id);
    res.json({ msg: "Job Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post('/fileUpload',auth, async (req, res) => {

  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
      // accessing the file
  const file = req.files.file;

  //  mv() method places the file inside public directory
  file.mv(`${__dirname}/../client/files/${file.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({_id:uuidv4(),name: file.name, path: `${__dirname}/../client/files/${file.name}`});
  });
})


module.exports = router;
