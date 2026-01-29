const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

transporter.verify().then(() => console.log("Email server is ready"));

const sendEmailRemainder = async (to, task) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `Task Reminder: ${task.title}`,
    text: task.description || "You have a pending task",
  });
  console.log("EMAIL SENT:", to);
};

module.exports = { sendEmailRemainder };
