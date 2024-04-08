import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const ChatSender = ({ message }) => {
  return (
    <View style={[styles.messageBubble, styles.senderMessage]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '70%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: "#D5F1FF",
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default ChatSender;
