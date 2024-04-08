import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Image } from "react-native";
import Colors from "../../constants/Colors";
import ChatReceiver from "./ChatReceiver";
import ChatSender from "./ChatSender";
import { Ionicons } from '@expo/vector-icons'; 
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker'; 
import { useState } from 'react';

export default function Chat1to1() {

  const data = [
    { id: '1', sender: true, message: 'Begin Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '2', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương'},
    { id: '3', sender: true, message: 'Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '4', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương' },
    { id: '5', sender: true, message: 'Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '6', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương' },
    { id: '7', sender: true, message: 'Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '8', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương' },
    { id: '9', sender: true, message: 'Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '10', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương' },
    { id: '11', sender: true, message: 'Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '12', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương' },
    { id: '13', sender: true, message: 'Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '14', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương' },
    { id: '15', sender: true, message: 'Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn Tin nhắn của bạn' },
    { id: '16', sender: false, message: 'Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương Tin nhắn của đối phương' },
    
  ];

  const renderItem = ({ item }) => (
    item.sender ? <ChatSender message={item.message} /> : <ChatReceiver message={item.message} />
  );
  
  const [selectedFile, setSelectedFile] = useState(null); 
  const [message, setMessage] = useState('');

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync(); 
      if (result.type === 'success') {
        setSelectedFile(result); 
      }
    } catch (error) {
      console.log('Error selecting file:', error);
    }
  };
  

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setSelectedFile(result); 
      } else {
        console.log('Image selection cancelled.');
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const handleSend = () => {
    if (message || selectedFile) {
      console.log('Sending message:', message);
      console.log('Sending file:', selectedFile?.uri);
      
      // Xóa dữ liệu đã gửi
      setSelectedFile(null);
      setMessage('');
    } else {
      console.log('No message or file selected.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{marginTop: 80}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.conversation}
      />
      </ScrollView>
      {/* <SafeAreaView style={{marginTop: 80}}>
            <FlatList
              data={data}
              renderItem={renderItem} 
              keyExtractor={item => item.id}
              contentContainerStyle={styles.conversation}
            />
      </SafeAreaView> */}

      <View style={styles.messageInputContainer}>
        <TouchableOpacity onPress={handleSelectFile}>
          <Ionicons name="attach" size={24} color={Colors.primary} style={styles.optionButtonIcon} /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelectImage}>
          <Ionicons name="image" size={24} color={Colors.primary} style={styles.optionButtonIcon} /> 
        </TouchableOpacity>
        <TextInput
          placeholder="Tin nhắn..."
          style={styles.messageInput}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color={Colors.white} style={styles.sendButtonIcon} /> 
        </TouchableOpacity>
      </View>
      {/* Hiển thị hình ảnh đã chọn */}
      {selectedFile && (
        <View style={styles.selectedImageContainer}>
          <Image source={{ uri: selectedFile.uri }} style={styles.selectedImage} />
        </View>
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E9F1",
  },
  conversation: {
    flex: 1,
  },
  messageInputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: Colors.light_gray,
    padding: 10,
  },
  messageInput: {
    flex: 1,
    width: "60%",
    height: 40, 
    borderWidth: 1,
    borderColor: Colors.light_gray,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  optionButtonIcon: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 20,
  },
  sendButtonIcon: {
    marginLeft: 5,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
