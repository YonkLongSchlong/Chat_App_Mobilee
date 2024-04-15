import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { MessagesContext } from "../../context/MessagesContext";

export const useListenMesages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (Array.isArray(newMessage)) {
        setMessages((messages) => [...messages, ...newMessage]);
      } else {
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket.off("newMessage");
  }, [socket, messages, setMessages]);
};
