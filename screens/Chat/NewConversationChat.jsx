import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import ChatReceiver from "../../components/Chat/ChatReceiver";
import ChatSender from "../../components/Chat/ChatSender";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import FontSize from "../../constants/FontSize";
import ChatHeaderForNewConverse from "../../components/Chat/ChatHeaderForNewConvers";
import { MessagesContext } from "../../context/MessagesContext";
import { AuthContext } from "../../context/AuthContext";
import { useListenMesages } from "../../hooks/ListenSocket/useListenMesages";
import { LogBox } from "react-native";
import { useListenDeleteMesages } from "../../hooks/ListenSocket/useListenDeleteMessage";
import {
  useDeleteMessage,
  useSendImages,
  useFetchMessages,
  useSendMessage,
} from "../../hooks/Messages/index";

export const NewConversationChat = ({ route, navigation }) => {
  const { friend } = route.params;
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { token, user } = useContext(AuthContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const lastMessageRef = useRef();
  const handleContentSizeChange = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollToEnd({
        animated: false,
      });
    }
  };

  /* LẮNG NGHE SOCKET */
  useListenMesages();
  useListenDeleteMesages();

  // const handleSelectFile = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({});
  //     if (result.type === "success") {
  //       setSelectedFile(result);
  //     }
  //   } catch (error) {
  //     console.log("Error selecting file:", error);
  //   }
  // };

  const handleSelectImage = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
      });
      if (result.canceled) {
        return;
      }
      setSelectedImage(result.assets);
    }
  };

  const handleSendImage = async (selectedImage) => {
    const formData = new FormData();
    for (let i = 0; i < selectedImage.length; i++) {
      const fileMime = selectedImage[i].type;
      const fileType = selectedImage[i].uri.split(".").pop();
      const fileName = selectedImage[i].uri.split("/").pop();
      formData.append("images[]", {
        uri: `${selectedImage[i].uri}`,
        type: `${fileMime}/${fileType}`,
        name: `${fileName}`,
      });
    }
    const data = await useSendImages(token, friend._id, formData);
    LogBox.ignoreAllLogs();
    if (data.length == 0) {
      return;
    }
    setMessages((messages) => [...messages, ...data]);
    setSelectedImage(null);
  };

  const handleSend = async () => {
    if (message.length > 0) {
      const data = await useSendMessage(token, friend._id, message);
      setMessages([...messages, data.newMessage]);
      LogBox.ignoreAllLogs();
      setMessage("");
    } else {
      console.log("No message or file selected.");
    }
  };

  const downLoadImage = async () => {
    const fileName = selectedMessage.message.split("/").pop();
    const result = await FileSystem.downloadAsync(
      selectedMessage.message,
      FileSystem.documentDirectory + fileName
    );
    await saveToPhone(result.uri, fileName, result.headers["Content-Type"]);
    setShowModal(false);
  };

  const saveToPhone = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((error) => console.log(error.message));
      } else {
        Sharing.shareAsync(uri);
      }
    } else {
      Sharing.shareAsync(uri);
    }
  };

  const handleDelete = async () => {
    const newMessages = await useDeleteMessage(
      messages,
      user,
      friend._id,
      token,
      selectedMessage._id
    );
    setMessages(newMessages);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchMessage = async () => {
      setIsLoading(true);
      const data = await useFetchMessages(token, friend._id);
      setMessages(data);
      setIsLoading(false);
    };

    fetchMessage();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* ---------- CHAT MODAL ---------- */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalBtnContainer}>
            <ModalBtn
              label="Download image"
              deleteMessage={downLoadImage}
              disable={true}
            />
            <ModalBtn
              label="Delete this message"
              deleteMessage={handleDelete}
            />
            <ModalBtn
              label="Share this message"
              deleteMessage={() => {
                setShowModal(false);
                navigation.navigate("ShareMessage", {
                  selectedMessage,
                });
              }}
            />
          </View>
          <Pressable
            style={styles.closeModalBtn}
            onPress={() => {
              setShowModal(false);
            }}
          >
            <Ionicons name="close" size={22} color={Colors.black} />
          </Pressable>
        </View>
      </Modal>

      {/* ---------- CHAT HEADER ---------- */}
      <ChatHeaderForNewConverse friend={friend} />

      {/* ---------- MESSAGES CONTAINER ---------- */}
      <View style={styles.container}>
        {!isLoading ? (
          <ScrollView
            ref={lastMessageRef}
            onContentSizeChange={handleContentSizeChange}
          >
            {messages.length > 0 &&
              messages.map((item) => {
                if (item.senderId !== user._id.toString()) {
                  return (
                    <ChatReceiver
                      key={item._id}
                      item={item}
                      setShowModal={setShowModal}
                      setSelectedMessage={setSelectedMessage}
                      participant={friend}
                    />
                  );
                } else {
                  return (
                    <ChatSender
                      key={item._id}
                      item={item}
                      setShowModal={setShowModal}
                      setSelectedMessage={setSelectedMessage}
                    />
                  );
                }
              })}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        )}

        {/* ---------- MESSAGE INPUT ---------- */}
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
          <Pressable onPress={handleSelectImage}>
            <Ionicons
              name="image-outline"
              size={24}
              color={Colors.primary}
              style={styles.optionButtonIcon}
            />
          </Pressable>

          {/* ---------- INPUT ---------- */}
          <TextInput
            placeholder="Tin nhắn..."
            style={styles.messageInput}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />

          {/* ---------- SEND MSG BUTTON ---------- */}
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Ionicons
              name="send"
              size={22}
              color={Colors.primary}
              style={styles.sendButtonIcon}
            />
          </Pressable>
        </View>

        {/* Hiển thị hình ảnh đã chọn */}
        {selectedImage && (
          <>
            <ScrollView horizontal style={styles.selectedImageContainer}>
              {selectedImage.map((file, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: `${file.uri}` }}
                    style={styles.selectedImage}
                  />
                );
              })}
            </ScrollView>
            <View style={styles.btnContainer}>
              <Pressable
                style={styles.sendImageBtn}
                onPress={() => {
                  handleSendImage(selectedImage);
                }}
              >
                <Text style={styles.sendImageBtnText}>Send</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const ModalBtn = (props) => {
  return (
    <Pressable
      style={styles.modalBtn}
      onPress={() => {
        props.deleteMessage();
      }}
    >
      <View style={styles.iconLabelContainer}>
        <Text style={styles.labelText}>{props.label}</Text>
      </View>
      <View>
        <Ionicons name="chevron-forward" size={22} color={Colors.black} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#E2E9F1",
  },
  modal: {
    width: Dimensions.get("window").width,
    height: 270,
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.white,
    borderRadius: 30,
  },
  closeModalBtn: {
    position: "absolute",
    top: 20,
    right: 30,
    padding: 2,
    borderRadius: 20,
  },

  modalBtnContainer: {
    marginTop: 75,
    gap: 20,
  },
  modalBtn: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 70,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontFamily: "medium",
    fontSize: FontSize.medium,
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
