import { useContext, useEffect } from "react";
import { MessagesContext } from "../../context/MessagesContext";
import { SocketContext } from "../../context/SocketContext";

export const useListenMesages = () => {
    const { socket } = useContext(SocketContext);
    const { messages, setMessages } = useContext(MessagesContext);

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            if (Array.isArray(newMessage)) {
                setMessages((messages) => [...messages, ...newMessage]);
            } else {
                setMessages((messages) => [...messages, newMessage]);
            }
        });

        socket?.on("delMessage", (docs) => {
            setMessages((messages) =>
                messages.filter((message) => {
                    return message._id !== docs._id;
                })
            );
        });

        return () => {
            socket.off("newMessage");
            socket.off("delMessage");
        };
    }, [socket]);
};
