import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatReceiver = ({ message }) => {
  return (
    <View style={[styles.messageBubble, styles.receiverMessage]}>
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
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,   
    color: Colors.black,
  },
});

export default ChatReceiver;  