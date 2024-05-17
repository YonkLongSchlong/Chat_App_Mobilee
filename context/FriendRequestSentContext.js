import { createContext, useContext, useEffect, useState } from "react";
import { useFetchFriendRequestSent } from "../hooks/FriendRequest/useFetchFriendRequestSent";
import { AuthContext } from "./AuthContext";

export const FriendRequestsSentContext = createContext();

export const FriendRequestsSentProvider = ({ children }) => {
    const [friendRequestsSent, setFriendRequestsSent] = useState([]);
    const { user, token } = useContext(AuthContext);

    const fetchFriendRequestsSent = async () => {
        const response = await useFetchFriendRequestSent(user, token);
        const data = await response.json();
        if (response.status === 404) {
            setFriendRequestsSent(null);
        } else {
            setFriendRequestsSent(data);
        }
    };

    useEffect(() => {
        fetchFriendRequestsSent();
    }, []);
    return (
        <FriendRequestsSentContext.Provider
            value={{
                friendRequestsSent,
                setFriendRequestsSent,
            }}
        >
            {children}
        </FriendRequestsSentContext.Provider>
    );
};
