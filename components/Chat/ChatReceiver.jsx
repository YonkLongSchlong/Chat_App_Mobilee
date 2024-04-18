import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";

const ChatReceiver = ({
  item,
  setShowModal,
  setSelectedMessage,
  participants,
  participant,
}) => {
  const isImage = item.messageType === "image" ? true : false;
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  let user = "";
  if (participants !== undefined) {
    participants.forEach((participant) => {
      if (participant._id == item.senderId) user = participant;
    });
  } else {
    user = participant;
  }

  return (
    <Pressable
      style={styles.container}
      onLongPress={() => {
        setShowModal(true);
        setSelectedMessage(item);
      }}
    >
      <View style={styles.userAvatarContainer}>
        <Image
          style={styles.userAvatar}
          source={{
            uri: `${user.avatar}`,
          }}
        />
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.messageBubble}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          {isImage ? (
            <>
              <Image source={{ uri: item.messageUrl }} style={styles.image} />
              <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
            </>
          ) : (
            <>
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 16,
    alignItems: "flex-end",
  },
  userAvatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginVertical: 8,
  },
  userAvatar: {
    borderRadius: 100,
    height: 40,
    width: 40,
    resizeMode: "cover",
  },
  messageContainer: {
    maxWidth: "75%",
  },
  messageBubble: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    alignSelf: "flex-start",
    backgroundColor: Colors.white,
    marginLeft: 10,
    gap: 7,
  },
  usernameContainer: {},
  username: {
    fontFamily: "regular",
    fontSize: FontSize.small,
    color: Colors.dark_gray,
  },
  messageText: {
    fontSize: FontSize.regular,
    color: Colors.black,
    lineHeight: 20,
    fontFamily: "regular",
  },
  timeText: {
    fontFamily: "regular",
    fontSize: FontSize.small,
    color: Colors.dark_gray,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
  },
});

export default ChatReceiver;
