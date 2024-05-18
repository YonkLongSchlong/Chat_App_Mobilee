import { useContext, useEffect } from "react";
import { ConversationsContext } from "../../context/ConversationsContext";
import { SocketContext } from "../../context/SocketContext";

export const useListenConversations = () => {
    const { socket } = useContext(SocketContext);
    const { setConversations } = useContext(ConversationsContext);

    useEffect(() => {
        socket?.on("newConversation", (conversation) => {
            setConversations((conversations) => [
                conversation,
                ...conversations,
            ]);
        });

        socket?.on("delConversation", (conversation) => {
            setConversations((conversations) =>
                conversations.filter((convers) => {
                    return convers._id !== conversation._id;
                })
            );
        });
    }, [socket]);
};
