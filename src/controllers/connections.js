import User from "../models/user.js";
import ConnectionRequest from "../models/connectionRequest.js";

export const sendRequest = async (req, res) => {
  try {
    const { _id } = req.user;
    const { userId, status } = req.params;
    if (!["ignored", "interested"].includes(status)) {
      throw new Error("Invalid status type");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const exestingConnection = await ConnectionRequest.findOne({
      $or: [
        { fromUser: _id, toUser: userId },
        { fromUser: userId, toUser: _id },
      ],
    });

    if (exestingConnection) {
      throw new Error("Connection already exists");
    }

    const connection = new ConnectionRequest({
      fromUser: _id,
      toUser: userId,
      status,
    });
    await connection.save();
    res.status(200).send({
      message:
        status == "interested"
          ? `${req.user.firstName} is intereste ${user.firstName}`
          : `${req.user.firstName} pass ${user.firstName}`,
      status,
    });
  } catch (err) {
    res.status(500).send({ message: err.message, status: false });
  }
};
