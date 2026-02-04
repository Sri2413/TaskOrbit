const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000, // 10s
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify().then(() => console.log("Email server is ready"));

async function sendEmailRemainder(to, task) {
  try {
    await transporter.sendMail({
      from: `"TaskOrbit" <${process.env.EMAIL_USER}>`,
      to,
      subject: `⏰ Reminder: ${task.title}`,
      html: `<p>${task.description}</p>`,
    });
    console.log("EMAIL SENT TO:", to);
  } catch (err) {
    console.error("EMAIL FAILED:", err.message);
    // ❗ DO NOT THROW
  }
}

module.exports = { sendEmailRemainder };
