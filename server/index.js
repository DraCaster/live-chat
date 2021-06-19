const express = require('express');
const app = express();
const httpServer = require("http").Server(app);

const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
});


io.on("connection", socket => {
    const { id } = socket.client;
    console.log(`User connected: ${id}`);
    socket.on("chat message", ({ nickname, msg }) => {
        io.emit("chat message", { nickname, msg });
      });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

