import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ConversationProvider } from "../../context/ConversationContext";
import { ConversationsProvider } from "../../context/ConversationsContext";
import { FriendRequestsSentProvider } from "../../context/FriendRequestSentContext";
import { FriendsProvider } from "../../context/FriendsContext";
import { MessagesProvider } from "../../context/MessagesContext";
import { SocketProvider } from "../../context/SocketContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export default function NavigationWrapper() {
    const { token, user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {token !== null && user !== null ? (
                <SocketProvider>
                    <MessagesProvider>
                        <FriendsProvider>
                            <FriendRequestsSentProvider>
                                <ConversationsProvider>
                                    <ConversationProvider>
                                        <AppStack />
                                    </ConversationProvider>
                                </ConversationsProvider>
                            </FriendRequestsSentProvider>
                        </FriendsProvider>
                    </MessagesProvider>
                </SocketProvider>
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}
