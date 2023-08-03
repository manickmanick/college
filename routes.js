const express = require("express");
const router = express.Router();
const university = require("./model/university/controller");
const student = require("./model/students/controller");
const admin = require("./model/admin/controller");
const nodeMailer = require("nodemailer");
var logger = require("./logger/log");
const path = require("path");
const multer = require("multer");
const auth = require("./authorization/auth");
let mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "manicm265@gmail.com",
    pass: process.env.mail_password,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

function sendMail(req, res) {
  let mailDetails = {
    from: "manicm265@gmail.com",
    to: `${req.mail}`,
    subject: "Test mail",
    text: `${req.message}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, result) {
    var d = new Date();
    if (err) logger.error(`Error occured : ${err}`);
    else
      logger.info(`email was sent successfully to this ${req.mail} id at ${d}`);
  });
}

//university route

router.post("/auth/addUniversity", university.insertUniversities);

router.get("/auth/getUniversity", university.getUniversity);

router.post("/auth/updateUniversity", university.updateUniversity);

router.post("/auth/deleteUniversity/:id", university.deleteUniversity);

//student route

router.post("/auth/addStudent", student.addStudent, sendMail);

router.post("/auth/updateStudent/:id", student.updateStudent, sendMail);

router.get("/auth/getStudents", student.getStudent); //get all students

router.post("/auth/deleteStudent/:id", student.deleteStudent);

router.post("/auth/findStudent/:id", student.findStudentById);

// get limited number of student for pagination purpose

router.post("/auth/getLimitedStudents/:limit/:pageNo", student.findByPage);

//check sample data for pagination
router.get("/insertSampleStudents", student.insertSampleData);

router.post(
  "/students/upload",
  upload.single("profilePicture"),
  student.uploadPicture,
);

//admin route

router.post("/login", admin.login);
router.post("/changePassword/:id", auth.verifyToken, admin.changePassword);

module.exports = router;
