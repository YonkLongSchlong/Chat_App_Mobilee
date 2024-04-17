import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, Pressable, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useNavigation } from '@react-navigation/native';

const ChatGroup = () => {
  const navigative = useNavigation();

  // Danh sách tin nhắn trong nhóm chat (ví dụ)
  const messages = [
    { id: 1, sender: true, text: 'Hello!', receiver: { username: 'Receiver 1', avatar: 'avatar1.jpg' } },
    { id: 2, sender: false, text: 'Hi there!', receiver: { username: 'Receiver 2', avatar: 'avatar2.jpg' } },
    { id: 3, sender: false, text: 'Hi there!', receiver: { username: 'Receiver 3', avatar: 'avatar2.jpg' } },
    { id: 4, sender: true, text: 'Hi there!', receiver: { username: 'Receiver 1', avatar: 'avatar2.jpg' } },
    // Thêm các tin nhắn khác ở đây
  ];

  // Render một tin nhắn
  const renderMessage = ({ item }) => {
    return (

      <View style={item.sender ? styles.senderContainer : styles.receiverContainer}>
        {!item.sender && (
          <View style={styles.receiverInfo}>
            <Image style={styles.receiverAvatar} source={{ uri: item.receiver.avatar }} />
            <Text style={styles.receiverUsername}>{item.receiver.username}</Text>
          </View>
        )}
        <Text style={styles.message}>{item.text}</Text>
      </View>
    );
  };

  const handlePressOption = () => {
    navigative.navigate('Option');
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.menuIcon} onPress={handlePressOption}>
          <Ionicons name="menu" size={24} color="black" />
        </Pressable>
      <SafeAreaView >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />

<View style={styles.messageInputContainer}>
          <Pressable>
            <Ionicons
              name="attach"
              size={24}
              color={Colors.primary}
              style={styles.optionButtonIcon}
            />
          </Pressable>

          {/* ---------- SELECT IMAGE BTN ---------- */}
          <Pressable>
            <Ionicons
              name="image"
              size={24}
              color={Colors.primary}
              style={styles.optionButtonIcon}
            />
          </Pressable>

          {/* ---------- INPUT ---------- */}
          <TextInput
            placeholder="Tin nhắn..."
            style={styles.messageInput}
          />

          {/* ---------- SEND MSG BUTTON ---------- */}
          <Pressable style={styles.sendButton} >
            <Ionicons
              name="send"
              size={22}
              color={Colors.primary}
              style={styles.sendButtonIcon}
            />
          </Pressable>
        </View>
      
      </SafeAreaView>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    backgroundColor: '#ffffff',
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it's above other components
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    maxWidth: '80%',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    maxWidth: '80%',
  },
  receiverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  receiverAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  receiverUsername: {
    fontWeight: 'bold',
  },
  message: {
    color: '#ffffff', // Màu văn bản của tin nhắn
  },
  
  messageInputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.light_gray,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  messageInput: {
    flex: 1,
    width: "100%",
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light_gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: "regular",
    fontSize: FontSize.small,
  },
  optionButtonIcon: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 5,
    padding: 5,
  },
  sendButtonIcon: {
    marginLeft: 5,
  },
  selectedImageContainer: {
    flexDirection: "row",
    padding: 10,
    height: 170,
  },
  selectedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  sendImageBtn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  sendImageBtnText: {
    color: Colors.white,
    fontFamily: "medium",
    fontSize: FontSize.regular,
  },
});

export default ChatGroup;
