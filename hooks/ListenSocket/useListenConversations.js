import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { ConversationsContext } from "../../context/ConversationsContext";

export const useListenConversations = () => {
  const { socket } = useContext(SocketContext);
  const { conversations, setConversations } = useContext(ConversationsContext);

  useEffect(() => {
    socket?.on("newConversation", (conversation) => {
      setConversations([...conversations, conversation]);
    });

    socket?.on("delConversation", (conversation) => {
      const newConversations = conversations.filter((convers) => {
        return convers._id !== conversation._id;
      });
      if (newConversations.length == 0) {
        setConversations([]);
      }
      setConversations(newConversations);
    });
  }, [socket, conversations, setConversations]);
};
