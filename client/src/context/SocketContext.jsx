import { useContext, createContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client"

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
}


export const SocketProvider = ({children}) => {
    const socket= useRef(null);
    const {currentUser} = useSelector(state => state.user);
    useEffect(() => {
        if(currentUser) {
            socket.current = io("http://localhost:8000",{
                withCredentials: true,
                query:{ userId: currentUser._id}
            })
            socket.current.on("connect", () => {
                console.log("Connected to socket server.")
            })

            return () => {
                socket.current.disconnect();
            }
        }
    } , [currentUser]);
    

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
}