const cron = require("node-cron");
const Task = require("../models/Tasks");
const { sendEmailRemainder } = require("../utils/emailServices");
const { sendSmsRemainder } = require("../utils/smsService");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    console.log("CRON UTC TIME:", now.toISOString());

    // Fetch due tasks
    const tasks = await Task.find({
      remainderSent: false,
      remainderAt: { $lte: now },
    });

    console.log("MATCHED TASKS:", tasks.length);

    for (const task of tasks) {
      try {
        // 🔁 Re-fetch latest state from DB
        const freshTask = await Task.findById(task._id);

        // ❗ If task deleted → skip
        if (!freshTask) {
          console.log("⚠️ Task deleted, skipping:", task._id);
          continue;
        }

        // ❗ If already reminded → skip (race condition safety)
        if (freshTask.remainderSent) {
          console.log("⚠️ Already reminded:", task._id);
          continue;
        }

        // Send Email
        if (freshTask.email) {
          await sendEmailRemainder(freshTask.email, freshTask);
        }

        // Send SMS
        if (freshTask.phone) {
          await sendSmsRemainder(freshTask.phone, freshTask);
        }

        // Mark reminder sent
        freshTask.remainderSent = true;
        await freshTask.save();

        console.log("✅ REMINDER SENT:", task._id);

      } catch (err) {
        console.error("❌ SEND FAILED:", task._id, err.message);
      }
    }
  } catch (err) {
    console.error("CRON JOB ERROR:", err);
  }
});
