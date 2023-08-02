const express = require("express");
const router = express.Router();
const university = require("./model/university/controller");
const student = require("./model/students/controller");
const nodeMailer = require("nodemailer");
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
    to: `46sample@gmail.com`,
    subject: "Test mail",
    text: "student was created",
  };

  mailTransporter.sendMail(mailDetails, function (err, result) {
    if (err) console.log(err);
    else console.log(`email sent successfully ${result} `);
  });
}

//university route

router.post("/addUniversity", university.insertUniversities);

router.get("/getUniversity", university.getUniversity);

router.post("/updateUniversity", university.updateUniversity);

router.post("/deleteUniversity/:id", university.deleteUniversity);

//student route

router.post("/addStudent", student.addStudent, sendMail);

module.exports = router;
