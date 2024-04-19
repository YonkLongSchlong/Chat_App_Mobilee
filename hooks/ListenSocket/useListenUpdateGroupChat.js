import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useFetchGroupChatMessages } from "../ChatGroup";

export const useListenUpdateGroupChat = (
  messages,
  setMessages,
  conversation
) => {
  const navivation = useNavigation();
  const { socket } = useContext(SocketContext);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    socket?.on("updateGroupChat", async () => {
      const data = await useFetchGroupChatMessages(token, conversation._id);
      if (data.length == 0) {
        setMessages([]);
      } else {
        setMessages(data);
      }
    });

    socket?.on("remove", () => {
      navivation.navigate("Dashboard");
    });

    socket?.on("close", () => {
      navivation.navigate("Dashboard");
    });

    return () => socket.off("updateGroupChat");
  }, [socket, messages, setMessages]);
};
