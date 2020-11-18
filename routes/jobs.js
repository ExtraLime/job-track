const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const config = require("../config/production.json");

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Job = require("../models/Job");
const User = require("../models/User");

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

// @desc  GET USERS JOBS

// @route GET api/jobs
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user.id);

    // check role and return all appropriate jobs
    if (user.role === "contractor") {
      const jobs = await Job.find({ contractor: req.user.id }).sort({
        date: -1,
      });
      res.json(jobs);
    } else if (user.role === "owner") {
      const jobs = await Job.find({ owner: req.user.id }).sort({ date: -1 });
      res.json(jobs);
    } else {
      res.status(500).send("No such User");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @desc  ADD NEW JOB

// @route POST api/jobs
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("title", "Name is Required").not().isEmpty(),
      check("content", "Please provide a description of the job.")
        .not()
        .isEmpty(),
      check("dueDate", "You must select a due date.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, dueDate, content, filesData, contractor, urgent } = req.body;

    let fullContractor = await User.findById(contractor.id).select([
      "name",
      "email",
    ]);

    try {
      newJob = new Job({
        owner: req.user.id,
        title,
        dueDate,
        content,
        urgent,
        filesData,
        contractor: fullContractor,
      });

      const job = await newJob.save();

      res.json(job);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/jobs/:id
// @desc  Edit job
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const {
    title,
    contractor,
    lastUpdate,
    status,
    urgent,
    dueDate,
    content,
    filesData,
    closeDate,
    closingNote,
    updates,
  } = req.body;

  // Build contact object
  const jobFields = {};
  if (title) jobFields.title = title;
  if (content) jobFields.content = content;
  if (filesData) jobFields.filesData = filesData;
  if (dueDate) jobFields.dueDate = dueDate;
  if (lastUpdate) jobFields.lastUpdate = lastUpdate;
  if (contractor) jobFields.contractor = contractor;
  if (status) jobFields.status = status;
  if (closeDate) jobFields.closeDate = closeDate;
  if (urgent) jobFields.urgent = urgent;
  if (updates) jobFields.updates = updates;
  if (closingNote) jobFields.closingNote = closingNote;

  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Make sure the requesting user is authorized to change the job ??
    if ([job.owner, job.contractor].includes(req.user.id)) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

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

// @route DELETE api/job/:id
// @desc  delete a job
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Validate ownership
    if ([job.owner, job.contractor].includes(req.user.id)) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Job.findByIdAndRemove(req.params.id);
    res.json({ msg: "Job Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/jobs/fileUpload
// @desc  uploads one file to bucketeer
// @access  Private

router.post("/fileUpload", auth, async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file not found" });
  }
  // accessing the file
  const file = req.files.file;
  // instantiate an S3 instance
  const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
    apiVersion: "2006-03-01",
  });

  if (!s3) {
    res
      .status(500)
      .send(
        "Sorry, there seems to be a problem with your storage hosting service"
      );
  }

  const params = {
    // create random prefix for filename/key
    Key: "public/" + uuidv4().toString().substring(0, 10) + file.name,
    Bucket: config.AWS_BUCKET_NAME,
    Body: file.data,
  };

  s3.putObject(params, function put(err, data) {
    if (err) {
      console.log(err, err.stack);
      return;
    } else {
      console.log(data, params.Key);
    }

    delete params.Body;
    s3.getObject(params, function put(err, data) {
      if (err) console.log(err, err.stack);
      else console.log(Object.keys(data));

      return res.status(200).send({ Key: params.Key, name: file.name });
    });
  });
});

module.exports = router;
