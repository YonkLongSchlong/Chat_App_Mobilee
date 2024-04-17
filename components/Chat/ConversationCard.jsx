import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import useFetchConversation from "../../hooks/Conversations/useFetchConversation";
import { MessagesContext } from "../../context/MessagesContext";
import { useListenNotification } from "../../hooks/ListenSocket/useListenNotification";
import { formatTime } from "../../utils/FormatTime";
import { useFetchCreateGroup } from "../../hooks/ChatGroup/useFetchCreateGroup";

export default function ConversationCard({ convers }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState(convers);
  const { messages } = useContext(MessagesContext);
  const { user, token } = useContext(AuthContext);
  // const lastMessage = conversation.messages[conversation.messages.length - 1];
  // const check = lastMessage?.messageType == "image" ? true : false;

  let participant = {};

  conversation.participants.forEach((userToChat) => {
    if (userToChat._id != user._id) {
      participant = userToChat;
    }
  });

  /* LẮNG NGHE SOCKET */
  useListenNotification(conversation, setConversation);

  useEffect(() => {
    const getConversation = async () => {
      setIsLoading(true);
      const data = await useFetchConversation(user, token, conversation._id);
      setConversation(data);
      setIsLoading(false);
    };

    getConversation();
  }, []);

  return (
    <>
      {!isLoading && (
        <Pressable
          style={styles.container}
          onPress={() =>
            navigation.push("Chat1to1", {
              participant,
            })
          }
        >
          <View style={styles.conversationContainer}>
            {/* ---------- AVARTA ---------- */}
            <View style={styles.avartaContainer}>
              <Image
                style={{ height: 65, width: 65, resizeMode: "cover" }}
                source={{ uri: `${participant?.avatar}` }}
              />
            </View>

            {/* ---------- MESSAGE BOX ---------- */}
            <View style={styles.messageContainer}>
              {/* USERNAME */}
              <View>
                <Text style={styles.usernameText}>{participant?.username}</Text>
              </View>

              {/* ---------- LASTEST MESSAGE ---------- */}
              {/* <View>
                <Text style={styles.messageText} numberOfLines={1}>
                  {check ? "Image" : `${lastMessage?.message}`}
                </Text>
              </View> */}
            </View>

            {/* ---------- TIME OF LAST MESSAGE ---------- */}
            {/* <View>
              <Text style={styles.timeText}>
                {formatTime(lastMessage?.createdAt)}
              </Text>
            </View> */}
          </View>

          {/* ---------- SEPARATOR ---------- */}
          <View
            style={{
              paddingLeft: 105,
              height: 1,
              width: StyleSheet.hairlineWidth,
              backgroundColor: "white",
            }}
          ></View>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  conversationContainer: {
    flex: 1,
    backgroundColor: "white",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  avartaContainer: {
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  messageContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    gap: 5,
  },
  usernameText: {
    fontFamily: "medium",
    fontSize: FontSize.regular,
    color: Colors.black,
  },
  messageText: {
    fontFamily: "regular",
    fontSize: FontSize.regular,
    color: Colors.dark_gray,
  },
  timeText: {
    fontFamily: "regular",
    fontSize: FontSize.small,
    color: Colors.dark_gray,
  },
});
