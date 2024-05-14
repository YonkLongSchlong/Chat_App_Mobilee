import React, { createContext, useState } from "react";

export const ConversationContext = createContext();
export const ConversationProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState({});
    return (
        <ConversationContext.Provider
            value={{ conversation, setConversation, isLoading, setIsLoading }}
        >
            {children}
        </ConversationContext.Provider>
    );
};
