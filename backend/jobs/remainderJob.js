const cron = require("node-cron");
const Task = require("../models/Tasks");
const { sendEmailRemainder } = require("../utils/emailServices");
const { sendSmsRemainder } = require("../utils/smsService");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    console.log("CRON UTC TIME:", now.toISOString());

    while (true) {
      // 🔐 Atomically fetch + lock task
      const task = await Task.findOneAndUpdate(
        {
          remainderSent: false,
          remainderAt: { $lte: now },
        },
        {
          $set: { remainderSent: true }, // lock immediately
        },
        {
          new: true,
        },
      );

      // No more tasks
      if (!task) {
        console.log("NO MORE DUE TASKS");
        break;
      }

      console.log("PROCESSING:", task._id);

      try {
        if (task.email) {
          await sendEmailRemainder(task.email, task);
        }

        if (task.phone) {
          await sendSmsRemainder(task.phone, task);
        }

        console.log("✅ REMINDER SENT:", task._id);
      } catch (err) {
        console.error("❌ SEND FAILED:", task._id, err.message);
      }
    }
  } catch (err) {
    console.error("CRON JOB ERROR:", err);
  }
});
