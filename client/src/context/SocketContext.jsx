import { useContext, createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client"
import { useDispatch } from "react-redux";
import { addMessage } from "../app/chat/chatSlice";

const SocketContext = createContext(null);

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
            socket.current = io("http://localhost:8000",{
                withCredentials: true,
                query:{ userId: currentUser._id}
            })
            socket.current.on("connect", () => {
                console.log("Connected to socket server.");
                setIsSocketConnected(true);
            })

            console.log(socket.current)
            const handleReceiveMessage = (message) => {
                
                if(selectedChatType !== null && selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id){
                    console.log(message)
                    dispatch(addMessage(message));
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