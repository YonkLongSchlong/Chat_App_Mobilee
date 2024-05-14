import { createContext, useState } from "react";

export const ConversationsContext = createContext();

export const ConversationsProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    return (
        <ConversationsContext.Provider
            value={{
                isLoading,
                conversations,
                setConversations,
                setIsLoading,
            }}
        >
            {children}
        </ConversationsContext.Provider>
    );
};
