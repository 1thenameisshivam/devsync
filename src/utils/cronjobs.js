import cron from "node-cron";
import User from "../models/user.js";

const sendUserNotification = async () => {
  const currentDate = new Date();
  const notificationDate = new Date();
  notificationDate.setDate(notificationDate.getDate() + 7);

  const users = await User.find({
    isPremium: true,
    membershipTime: { $lte: notificationDate, $gte: currentDate },
  });

  for (const user of users) {
    console.log(`Sending notification to ${user.email}`);
    // sending email
  }
};

cron.schedule("0 8 * * *", async () => {
  const currentDate = new Date();
  const users = await User.find({
    membershipTime: { $lt: currentDate },
  });

  for (const user of users) {
    user.isPremium = false;
    user.membershipType = null;
    user.membershipTime = null;
    await user.save();
  }

  await sendUserNotification();
});
