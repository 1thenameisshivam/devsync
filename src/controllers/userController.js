import ConnectionRequest from "../models/connectionRequest.js";
import User from "../models/user.js";
export const userRequests = async (req, res) => {
  try {
    const { _id } = req.user;
    const users = await ConnectionRequest.find({
      toUser: _id,
      status: "interested",
    }).populate(
      "fromUser",
      "firstName lastName photoUrl gender email createdAt"
    );
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
      .populate("fromUser", "firstName lastName email about photoUrl createdAt")
      .populate("toUser", "firstName lastName email about photoUrl createdAt");
    if (!users) {
      throw new Error("No connection found");
    }

    const data = users.map((user) =>
      user.fromUser._id.toString() === _id.toString()
        ? user.toUser
        : user.fromUser
    );

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message, status: false });
  }
};

export const userFeed = async (req, res) => {
  try {
    const { _id } = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const allUsers = await ConnectionRequest.find({
      $or: [{ fromUser: _id }, { toUser: _id }],
    }).select("fromUser toUser");
    const hideUser = new Set();
    allUsers.forEach((user) =>
      hideUser.add(user.fromUser.toString()).add(user.toUser.toString())
    );
    const data = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUser) } },
        { _id: { $ne: { _id } } },
      ],
    })
      .select("firstName _id lastName email about photoUrl age createdAt")
      .skip(skip)
      .limit(limit);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message, status: false });
  }
};
