import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";

import useFetchConversation from "../User/useFetchConversation";
import { AuthContext } from "../../context/AuthContext";

export const useListenNotification = (conversation, setConversation) => {
  const { socket } = useContext(SocketContext);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    socket?.on("getNotification", (message) => {
      useFetchConversation(user, token, conversation._id)
        .then((data) => {
          setConversation(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });

    return () => socket.off("getNotification");
  }, [socket]);
};
