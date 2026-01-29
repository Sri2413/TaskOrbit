const twilio = require("twilio");

if (
  !process.env.TWILIO_ACCOUNT_SID ||
  !process.env.TWILIO_AUTH_TOKEN ||
  !process.env.TWILIO_PHONE_NUMBER
) {
  throw new Error("Twilio credentials missing in .env");
}

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const sendSmsRemainder = async (to, task) => {
  if (!to) return;
  const message = task.description || `Reminder: ${task.title}`;
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to, // must include country code, e.g., +91XXXXXXXXXX
  });
  console.log("SMS SENT:", to);
};

module.exports = { sendSmsRemainder };
