const { Server } = require("socket.io");
const Message = require("./models/messages.model");

const setUpSocket = (server) => {
    const io = new Server(server, {
        cors:{
            origin: ["http://localhost:5173", "https://notsapp-sapm.onrender.com"],
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

    const sendMessage = async (message)=> {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        // const createdMessage = await Message.create(message);
        try {
            const createdMessage = await Message.create({
                sender: message.sender,
                recipient: message.recipient,
                content: message.content,
                messageType: message.messageType,
                fileUrl: message.fileUrl,
            });
    
            const messageData = await Message.findById(createdMessage._id).populate("sender", "id email firstName lastName image").populate("recipient","id email firstName lastName image")
    
            const messageToSend = {
                ...messageData.toObject(),
                tempId: message.tempId,  
            };
    
            if(recipientSocketId){
                io.to(recipientSocketId).emit("receivedMessage", messageToSend);
            }
    
            if(senderSocketId){
                io.to(senderSocketId).emit("receivedMessage", messageToSend);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if(userId){
            userSocketMap.set(userId, socket.id);
            // console.log(`User Connected: ${userId} with socket ID: ${socket.id}`)
        }else{
            // console.log("User ID not provided during connection");
        }

        socket.on("sendMessage", sendMessage);
        socket.on("disconnect", () => disconnect(socket));
    })
}

module.exports = {
    setUpSocket
}