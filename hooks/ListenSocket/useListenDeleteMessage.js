import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { MessagesContext } from "../../context/MessagesContext";

export const useListenDeleteMesages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    socket?.on("delMessage", (docs) => {
      const newMessages = messages.filter((message) => {
        return message._id !== docs._id;
      });
      setMessages(newMessages);
    });

    return () => socket.off("delMessage");
  }, [socket, messages, setMessages]);
};
