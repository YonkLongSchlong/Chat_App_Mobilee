import { createContext, useContext, useEffect, useState } from "react";
import { useFetchFriends } from "../hooks/FriendRequest/useFetchFriends";
import { AuthContext } from "./AuthContext";

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const { user, token } = useContext(AuthContext);

    const fetchFriends = async () => {
        const response = await useFetchFriends(user, token);
        const data = await response.json();
        if (response.status === 401 || response.status === 404) {
            setFriends([]);
        } else {
            setFriends(data);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <FriendsContext.Provider
            value={{
                friends,
                setFriends,
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};
