import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { useFetchGroupChatMessages } from "../ChatGroup";

export const useListenUpdateGroupChat = (
    messages,
    setMessages,
    conversation
) => {
    const navivation = useNavigation();
    const { socket } = useContext(SocketContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        socket.emit("join", conversation._id);
        socket?.on("updateGroupChat", async () => {
            const data = await useFetchGroupChatMessages(
                token,
                conversation._id
            );
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

        return () => {
            socket.off("updateGroupChat");
            socket.off("join");
        };
    }, [socket]);
};
