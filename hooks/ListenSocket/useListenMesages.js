import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { MessagesContext } from "../../context/MessagesContext";
import { useNavigation } from "@react-navigation/native";

export const useListenMesages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(newMessage);
      if (Array.isArray(newMessage)) {
        setMessages((messages) => [...messages, ...newMessage]);
      } else {
        setMessages([...messages, newMessage]);
      }
    });

    socket?.on("delMessage", (docs) => {
      const newMessages = messages.filter((message) => {
        return message._id !== docs._id;
      });
      setMessages(newMessages);
    });

    return () => socket.off("newMessage");
  }, [socket, messages, setMessages]);
};
