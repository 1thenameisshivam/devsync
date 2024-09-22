import ConnectionRequest from "../models/connectionRequest.js";

export const userRequests = async (req, res) => {
  try {
    const { _id } = req.user;
    const users = await ConnectionRequest.find({
      toUser: _id,
      status: "interested",
    }).populate("fromUser", "firstName lastName email createdAt");
    if (!users) {
      throw new Error("No request found");
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message, status: false });
  }
};

export const userConnections = async (req, res) => {
  try {
    const { _id } = req.user;
    const users = await ConnectionRequest.find({
      $or: [
        { fromUser: _id, status: "accepted" },
        { toUser: _id, status: "accepted" },
      ],
      status: "accepted",
    })
      .populate("fromUser", "firstName lastName email createdAt")
      .populate("toUser", "firstName lastName email createdAt");
    if (!users) {
      throw new Error("No connection found");
    }

    const data = users.map((user) =>
      user.fromUser._id === _id ? user.toUser : user.fromUser
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message, status: false });
  }
};
