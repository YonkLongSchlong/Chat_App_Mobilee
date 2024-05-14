import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";

export const useListenUpdateGroupChat = (conversation, setConversation) => {
    const navivation = useNavigation();
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit("join", conversation._id);
        socket?.on("updateGroupChat", (conversation) => {
            setConversation(conversation);
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
