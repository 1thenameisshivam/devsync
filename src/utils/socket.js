import { Server } from "socket.io";
import { FRONTEND_URL } from "./constant.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {
    socket.on("disconnect", () => {});
    socket.on("joinRoom", ({ userId, toUserId }) => {
      const roomId = [userId, toUserId].sort().join("_");

      socket.join(roomId);
    });
    socket.on("sendMessage", ({ userId, toUserId, name, text }) => {
      const roomId = [userId, toUserId].sort().join("_");
      socket.to(roomId).emit("reciveMessage", {
        name,
        text,
        timestamp: Date.now(),
        id: Date.now(),
      });
    });
  });
};

export default initializeSocket;
