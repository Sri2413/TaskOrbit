const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  debug: true,
});

transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP VERIFY FAILED:", err);
  } else {
    console.log("EMAIL SERVER READY");
  }
});

async function sendEmailRemainder(to, task) {
  try {
    await transporter.sendMail({
      from: `"TaskOrbit" <${process.env.EMAIL_USER}>`,
      to,
      subject: `⏰ Reminder: ${task.title}`,
      html: `
        <div style="font-family:sans-serif">
          <h3>Task Reminder</h3>
          <p><b>Title:</b> ${task.title}</p>
          <p><b>Description:</b> ${
            task.description || "No description provided"
          }</p>
        </div>
      `,
    });

    console.log("EMAIL SENT TO:", to);
  } catch (err) {
    console.error("EMAIL FAILED:", err);
  }
}

module.exports = { sendEmailRemainder };
