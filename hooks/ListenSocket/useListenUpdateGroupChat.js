import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { MessagesContext } from "../../context/MessagesContext";
import useFetchConversation from "../Conversations/useFetchConversation";
import { AuthContext } from "../../context/AuthContext";

export const useListenUpdateGroupChat = (conversation, setConversation) => {
  const { socket } = useContext(SocketContext);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    socket?.on("updateGroupChat", () => {
      useFetchConversation(user, token, conversation._id)
        .then((data) => {
          setConversation(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });

    return () => socket.off("updateGroupChat");
  }, [socket, conversation, setConversation]);
};
