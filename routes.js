const express = require("express");
const router = express.Router();
const university = require("./model/university/controller");
const student = require("./model/students/controller");
const admin = require("./model/admin/controller");
const nodeMailer = require("nodemailer");
var logger = require("./logger/log");
const auth = require("./authorization/auth");
let mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "manicm265@gmail.com",
    pass: process.env.mail_password,
  },
});

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

router.post("/addUniversity", university.insertUniversities);

router.get("/getUniversity", university.getUniversity);

router.post("/updateUniversity", university.updateUniversity);

router.post("/deleteUniversity/:id", university.deleteUniversity);

//student route

router.post("/auth/addStudent", student.addStudent, sendMail);

router.post("/auth/updateStudent/:id", student.updateStudent, sendMail);

router.get("/auth/getStudents", student.getStudent); //get all students

router.post("/auth/deleteStudent/:id", student.deleteStudent);

router.post("/auth/findStudent/:id", student.findStudentById);

//admin route

router.post("/login", admin.login);
router.post("/changePassword/:id", auth.verifyToken, admin.changePassword);

module.exports = router;
