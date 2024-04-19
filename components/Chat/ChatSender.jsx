import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { Ionicons } from "@expo/vector-icons";

const ChatSender = ({ item, setShowModal, setSelectedMessage }) => {
  const messageType = item.messageType;
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <Pressable
      style={styles.container}
      onLongPress={() => {
        setShowModal(true);
        setSelectedMessage(item);
      }}
    >
      <View style={styles.messageBubble}>
        {messageType == "image" ? (
          <>
            <Image source={{ uri: item.messageUrl }} style={styles.image} />
            <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
          </>
        ) : messageType == "text" ? (
          <>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
          </>
        ) : (
          <View style={styles.messageFileContainer}>
            <Ionicons name="document" size={22} color={Colors.black} />
            <View>
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: "70%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    alignSelf: "flex-end",
    backgroundColor: "#D5F1FF",
    marginRight: 10,
  },
  messageText: {
    fontSize: FontSize.regular,
    color: Colors.black,
  },
  timeText: {
    fontSize: FontSize.small,
    color: Colors.dark_gray,
    alignSelf: "flex-end",
    marginTop: 5,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "cover",
    borderRadius: 10,
  },
  messageFileContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default ChatSender;
