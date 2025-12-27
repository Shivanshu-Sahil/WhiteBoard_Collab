const express=require("express");
const app=express();

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { userJoin } = require("./utils/users");
const { addUser, getUser } = require("./utils/users");

const io=new Server(server);

// Store the latest whiteboard data per room (for new joiners)
const whiteboardState = {};

app.get("/",(req,res)=>{
  res.send("MERN Whiteboard");
});

io.on("connection",(socket)=>{
  // User joins a room
  socket.on("userJoined",(data)=>{
    const{name,userId,roomId,host,presenter}=data;
    socket.join(roomId);
    socket.userId = userId;
    socket.roomId = roomId;
    const users = addUser(data);
    // Send join confirmation to the user
    socket.emit("userJoined", { success: true, users, message: `Welcome ${name}` });
    socket.broadcast.to(roomId).emit("userJoinedMsg", name);
    socket.broadcast.to(roomId).emit("usersList", users);
    // If there is whiteboard state for this room, send it to the new user
    if (whiteboardState[roomId]) {
      socket.emit("whiteboardData", whiteboardState[roomId]);
    }
    // Optionally, notify others in the room about the new user
    // socket.broadcast.to(roomId).emit("userJoined", { name, userId });
  });

  // Presenter sends whiteboard data (JSON elements array)
    socket.on("whiteboardData",(data)=>{
    // Find the room(s) this socket is in (excluding its own id room)
    const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    rooms.forEach(roomId => {
      whiteboardState[roomId] = data; // Save latest state for the room
      // Broadcast to all others in the room
      socket.broadcast.to(roomId).emit("whiteboardData", data);
    });
  });

  // Handle chat messages
  socket.on("message", (data) => {
    const { message } = data;
    const user = getUser(socket.userId);
    if (user) {
      socket.broadcast
        .to(socket.roomId)
        .emit("messageResponse", { message, name: user.name });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // Remove user and update users list in the room
    if (socket.userId && socket.roomId) {
      const { removeUser, getUsersInRoom, getUser } = require("./utils/users");
      const user = getUser(socket.userId);
      removeUser(socket.userId);
      const users = getUsersInRoom(socket.roomId);
      socket.broadcast.to(socket.roomId).emit("userLeft", users);
      if (user && user.name) {
        socket.broadcast.to(socket.roomId).emit("userLeftMsg", user.name);
      }
    }
  });

});

const port=process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:5000/`);
});