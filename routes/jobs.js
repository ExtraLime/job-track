const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");


const Job = require("../models/Job");

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
    const { title, dateOpened, dueDate, content, files, filesData, links, closeDate } = req.body;

    try {
      newJob = new Job({
        owner: req.user.id, title, dueDate, content, filesData
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
  const { title, dateOpened, dueDate, content, files, links, closeDate } = req.body;

  // Build contact object
  const jonFields = {};
  if (title) jonFields.title = title;
  if (content) jonFields.content = content;
  if (files) jonFields.files = files;
  if (links) jonFields.links = links;
  if (dueDate) jonFields.dueDate = dueDate;


  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Contact not found" });

    // Make contact is users contact
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jonFields },
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

    // Make contact is users contact
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);
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
  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/../client/files/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `${__dirname}/../client/files/${myFile.name}`});
  });
})


module.exports = router;
