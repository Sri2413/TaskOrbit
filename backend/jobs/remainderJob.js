const cron = require("node-cron");
const Task = require("../models/Tasks");
const { sendEmailRemainder } = require("../utils/emailServices");
const { sendSmsRemainder } = require("../utils/smsService");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    console.log("CRON UTC TIME:", now.toISOString());

    const tasks = await Task.find({
      remainderSent: false,
      remainderAt: { $lte: now },
    });
    console.log("MATCHED TASKS:", tasks.length);

    for (const task of tasks) {
      try {
        if (task.email) await sendEmailRemainder(task.email, task);
        if (task.phone) await sendSmsRemainder(task.phone, task);
      } catch (err) {
        console.error("SEND FAILED:", task._id, err.message);
      }
      task.remainderSent = true; // mark after attempt
      await task.save();
      console.log("REMINDER MARKED SENT:", task._id);
    }
  } catch (err) {
    console.error("CRON JOB ERROR:", err);
  }
});
