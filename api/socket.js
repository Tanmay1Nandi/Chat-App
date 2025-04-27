const { Server } = require("socket.io")

const setUpSocket = (server) => {
    const io = new Server(server, {
        cors:{
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`)
        for(const [userId, socketId] of userSocketMap.entries()){
            if (socketId === socket.id){
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if(userId){
            userSocketMap.set(userId, socket.id);
            console.log(`User Connected: ${userId} with socket ID: ${socket.id}`)
        }else{
            console.log("User ID not provided during connection");
        }

        socket.on("disconnect", () => disconnect(socket));
    })
}

module.exports = {
    setUpSocket
}