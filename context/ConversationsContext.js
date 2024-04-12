import { useState } from "react";
import { createContext } from "react";

export const ConversationsContext = createContext();

export const ConversationsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState({});

  return (
    <ConversationsContext.Provider
      value={{
        isLoading,
        conversations,
        setConversations,
        setIsLoading,
        conversation,
        setConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
