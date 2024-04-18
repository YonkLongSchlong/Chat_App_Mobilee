import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { useFetchFriends } from "../hooks/FriendRequest/useFetchFriends";

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const { user, token } = useContext(AuthContext);

  const fetchFriends = async () => {
    const response = await useFetchFriends(user, token);
    const data = await response.json();
    if (response.status === 401) {
      setFriends(null);
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
