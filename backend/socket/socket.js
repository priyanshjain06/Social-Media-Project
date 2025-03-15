import { Server } from "socket.io"; //REVIEW
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.URL,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // this map stores socket id corresponding  to the user id; userId -> socketId

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]; // we are sending this to the controller in message controller

//REVIEW -
//   io.on('connection', callback)
// io: The instance of Server from socket.io, which listens for WebSocket events.
// .on('connection', callback): This registers an event listener for the connection event.
// socket: Represents the connected client and allows sending/receiving real-time messages.

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; //REVIEW take userID from query params , we have to send this from frontend in app.jsx
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  //REVIEW io.emit(event, data)
  //  is a method in Socket.IO used to broadcast a message to all connected clients for that server

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //REVIEW this socket.io is passed as callback to the io.on above
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
