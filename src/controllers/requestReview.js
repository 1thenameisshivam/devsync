import ConnectionRequest from "../models/connectionRequest.js";
const requestReview = async (req, res) => {
  try {
    const { _id } = req.user;
    const { requestId, status } = req.params;
    if (!["accepted", "rejected"].includes(status)) {
      throw new Error("Invalid status type");
    }
    const existingConnection = await ConnectionRequest.findOne({
      _id: requestId,
      toUser: _id,
      status: "interested",
    });

    if (!existingConnection) {
      throw new Error("Connection request not found");
    }
    existingConnection.status = status;
    await existingConnection.save();
    res.status(200).send({
      message: `Request ${status}`,
      status: true,
    });
  } catch (err) {
    res.status(500).send({ message: err.message, status: false });
  }
};

export default requestReview;
