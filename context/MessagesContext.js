import { createContext, useEffect, useState } from "react";

export const MessagesContext = createContext();

import React from "react";

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, isLoading, setIsLoading }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
