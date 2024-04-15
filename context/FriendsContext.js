import { useState } from "react";
import { createContext } from "react";

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);

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
