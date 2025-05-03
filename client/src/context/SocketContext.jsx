import { useContext, createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client"
import { useDispatch } from "react-redux";
import { addMessage } from "../app/chat/chatSlice";

const SocketContext = createContext(null);
const socketURL = import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:8000";
export const useSocket = () => {
    return useContext(SocketContext);
}


export const SocketProvider = ({children}) => {
    const socket= useRef();
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const {currentUser} = useSelector(state => state.user);
    const {selectedChatType, selectedChatData} = useSelector(state => state.chat);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(currentUser) {
            socket.current = io(socketURL,{
                withCredentials: true,
                query:{ userId: currentUser._id}
            })
            socket.current.on("connect", () => {
                console.log("Connected to socket server.");
                setIsSocketConnected(true);
            })

            const handleReceiveMessage = (message) => {
                
                const cleanedMessage = {
                    ...message,
                    sender: typeof message.sender === 'object' ? message.sender._id : message.sender,
                    recipient: typeof message.recipient === 'object' ? message.recipient._id : message.recipient,
                  };
                if(selectedChatType !== null && selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id){
                    
                    dispatch(addMessage(cleanedMessage));
                }
            }

            socket.current.on("receivedMessage", handleReceiveMessage);

            return () => {
                socket.current.off("receivedMessage", handleReceiveMessage)
                socket.current.disconnect();
                setIsSocketConnected(false); 
            }
        }
    } , [currentUser]);
    

    return (
        <SocketContext.Provider value={{ socket: socket.current, isSocketConnected }}>
            {children}
        </SocketContext.Provider>
    );
}