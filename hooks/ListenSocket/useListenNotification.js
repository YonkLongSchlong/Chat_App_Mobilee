import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import useFetchConversation from "../Conversations/useFetchConversation";

export const useListenNotification = (conversation, setConversation) => {
    const { socket } = useContext(SocketContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        socket?.on("notification", () => {
            useFetchConversation(token, conversation._id)
                .then((data) => {
                    setConversation(data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        });
    }, [socket]);
};
