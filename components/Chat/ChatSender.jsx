import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

const ChatSender = ({ item, setShowModal, setSelectedMessage }) => {
  const isImage = item.messageType === "image" ? true : false;
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
        {isImage ? (
          <>
            <Image source={{ uri: item.message }} style={styles.image} />
            <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
          </>
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
    marginVertical: 7,
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
});

export default ChatSender;
