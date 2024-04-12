import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "../../context/AuthContext";
import { SocketProvider } from "../../context/SocketContext";
import { ConversationsProvider } from "../../context/ConversationsContext";
import { MessagesProvider } from "../../context/MessagesContext";

export default function NavigationWrapper() {
  const { token, user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token !== null && user !== null ? (
        <SocketProvider>
          <MessagesProvider>
            <ConversationsProvider>
              <AppStack />
            </ConversationsProvider>
          </MessagesProvider>
        </SocketProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
