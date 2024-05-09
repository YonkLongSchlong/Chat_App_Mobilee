import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { FriendsContext } from "../../context/FriendsContext";

export const useListenAcceptRequest = () => {
    const { socket } = useContext(SocketContext);
    const { friends, setFriends } = useContext(FriendsContext);

    useEffect(() => {
        socket?.on("acceptedFriendRequest", (requester) => {
            setFriends((friends) => [...friends, requester]);
        });
    }, [socket]);
};
