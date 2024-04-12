import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";

const ChatReceiver = ({ item, setShowModal, setSelectedMessage }) => {
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
          <View>
            <Image source={{ uri: item.message }} style={styles.image} />
            <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
          </View>
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
    maxWidth: "75%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 7,
    alignSelf: "flex-start",
    backgroundColor: Colors.white,
    marginLeft: 10,
  },
  messageText: {
    fontSize: FontSize.regular,
    color: Colors.black,
    lineHeight: 20,
  },
  timeText: {
    fontSize: FontSize.small,
    color: Colors.dark_gray,
    marginTop: 5,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
  },
});

export default ChatReceiver;
