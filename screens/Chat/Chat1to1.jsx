import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { useContext, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    LogBox,
    Modal,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from "react-native";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatReceiver from "../../components/Chat/ChatReceiver";
import ChatSender from "../../components/Chat/ChatSender";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { MessagesContext } from "../../context/MessagesContext";
import { useListenMesages } from "../../hooks/ListenSocket";
import {
    useDeleteMessage,
    useFetchMessages,
    useRevokeMessage,
    useSendFile,
    useSendImages,
    useSendMessage,
    useSendVideos,
} from "../../hooks/Messages/index";

export default function Chat1to1({ route, navigation }) {
    const { participant } = route.params;
    const { messages, setMessages } = useContext(MessagesContext);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const { user, token } = useContext(AuthContext);
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

    const handleSelectFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                multiple: true,
            });
            if (!result.canceled) {
                const files = result.assets;
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append("files[]", {
                        name: files[i].name.split(".")[0],
                        uri: files[i].uri,
                        type: files[i].mimeType,
                        size: files[i].size,
                    });
                }
                const data = await useSendFile(
                    token,
                    participant._id,
                    formData
                );
                LogBox.ignoreAllLogs();
                if (data.length == 0 || data === undefined) {
                    return;
                }
                setMessages((messages) => [...messages, ...data]);
            }
        } catch (error) {
            console.log("Error selecting file:", error);
        }
    };

    const handleSelectImage = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
            });
            if (result.canceled) {
                return;
            }
            setSelectedImage(result.assets);
        }
    };

    const handleSendVideo = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsMultipleSelection: true,
            });
            if (result.canceled) {
                return;
            }

            const formData = new FormData();
            for (let i = 0; i < result.assets.length; i++) {
                const fileMime = result.assets[i].type;
                const fileType = result.assets[i].uri.split(".").pop();
                const fileName = result.assets[i].uri.split("/").pop();
                formData.append("videos[]", {
                    uri: `${result.assets[i].uri}`,
                    type: `${fileMime}/${fileType}`,
                    name: `${fileName}`,
                });
            }
            const data = await useSendVideos(token, participant._id, formData);
            LogBox.ignoreAllLogs();
            if (data.length == 0 || data === undefined) {
                return;
            }
            console.log(data);
            setMessages((messages) => [...messages, ...data]);
        }
    };

    const handleSendImage = async (selectedImage) => {
        const formData = new FormData();
        let options = [];
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
        const data = await useSendImages(token, participant._id, formData);
        LogBox.ignoreAllLogs();
        if (data.length == 0) {
            return;
        }
        setMessages((messages) => [...messages, ...data]);
        setSelectedImage(null);
    };

    const handleSend = async () => {
        if (message.length > 0) {
            const data = await useSendMessage(token, participant._id, message);
            if (data === undefined) {
                return;
            }
            setMessages((messages) => [...messages, data.newMessage]);
            setMessage("");
        } else {
            console.log("No message or file selected.");
        }
    };

    const handleRevoke = async () => {
        const newMessages = await useRevokeMessage(
            messages,
            participant._id,
            token,
            selectedMessage._id
        );
        if (newMessages === undefined) {
            setShowModal(false);
            return;
        } else {
            setMessages(newMessages);
            setShowModal(false);
        }
    };

    const handleDelete = async () => {
        const newMessages = await useDeleteMessage(
            messages,
            token,
            selectedMessage._id,
            participant._id
        );
        if (newMessages === undefined) {
            setShowModal(false);
            return;
        } else {
            setMessages(newMessages);
            setShowModal(false);
        }
    };

    const downLoadImage = async () => {
        const fileName = selectedMessage.messageUrl.split("/").pop();
        const result = await FileSystem.downloadAsync(
            selectedMessage.messageUrl,
            FileSystem.documentDirectory + fileName
        );
        await saveToPhone(result.uri, fileName, result.headers["Content-Type"]);
        setShowModal(false);
    };

    const downLoadFile = async () => {
        const fileName = selectedMessage.message;
        const result = await FileSystem.downloadAsync(
            selectedMessage.messageUrl,
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
                    .catch((error) =>
                        ToastAndroid.show(error.message, ToastAndroid.SHORT)
                    );
            } else {
                Sharing.shareAsync(uri);
            }
        } else {
            Sharing.shareAsync(uri);
        }
    };

    console.log("Render chat 1v1");
    useEffect(() => {
        const getMessage = async () => {
            setIsLoading(true);
            const data = await useFetchMessages(token, participant._id);
            if (data === undefined) {
                navigation.goBack();
            } else {
                setMessages(data);
                setIsLoading(false);
            }
        };
        getMessage();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            {/* ---------- CHAT MODAL ---------- */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                {selectedMessage && (
                    <View style={styles.modal}>
                        {selectedMessage.messageType === "text" ? (
                            <ModalForText
                                selectedMessage={selectedMessage}
                                handleRevoke={handleRevoke}
                                handleDelete={handleDelete}
                                navigation={navigation}
                                setShowModal={setShowModal}
                            />
                        ) : selectedMessage.messageType === "image" ||
                          selectedMessage.messageType === "video" ? (
                            <ModalForMedia
                                selectedMessage={selectedMessage}
                                handleRevoke={handleRevoke}
                                handleDelete={handleDelete}
                                navigation={navigation}
                                downLoadImage={downLoadImage}
                                setShowModal={setShowModal}
                            />
                        ) : (
                            selectedMessage.messageType === "file" && (
                                <ModalForFile
                                    selectedMessage={selectedMessage}
                                    handleRevoke={handleRevoke}
                                    handleDelete={handleDelete}
                                    navigation={navigation}
                                    downLoadFile={downLoadFile}
                                    setShowModal={setShowModal}
                                />
                            )
                        )}
                        <Pressable
                            style={styles.closeModalBtn}
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <Ionicons
                                name="close"
                                size={22}
                                color={Colors.black}
                            />
                        </Pressable>
                    </View>
                )}
            </Modal>

            {/* ---------- CHAT HEADER ---------- */}
            <ChatHeader participant={participant} />

            {/* ---------- MESSAGES CONTAINER ---------- */}
            <View style={styles.container}>
                {!isLoading ? (
                    <ScrollView
                        ref={lastMessageRef}
                        onContentSizeChange={handleContentSizeChange}
                    >
                        {messages.map((item) => {
                            if (item.senderId !== user._id.toString()) {
                                return (
                                    <ChatReceiver
                                        key={item._id}
                                        item={item}
                                        setShowModal={setShowModal}
                                        setSelectedMessage={setSelectedMessage}
                                        participant={participant}
                                        mainUser={user}
                                    />
                                );
                            } else {
                                return (
                                    <ChatSender
                                        key={item._id}
                                        item={item}
                                        setShowModal={setShowModal}
                                        setSelectedMessage={setSelectedMessage}
                                        mainUser={user}
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
                    <Pressable onPress={handleSelectFile}>
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

                    {/* ---------- SELECT VIDEO BTN ---------- */}
                    <Pressable onPress={handleSendVideo}>
                        <Ionicons
                            name="film-outline"
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
                        <ScrollView
                            horizontal
                            style={styles.selectedImageContainer}
                        >
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
                                <Text style={styles.sendImageBtnText}>
                                    Send
                                </Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const ModalForText = ({
    selectedMessage,
    navigation,
    handleRevoke,
    setShowModal,
    handleDelete,
}) => {
    return (
        <View style={styles.modalBtnContainer}>
            <ModalBtn
                label="Revoke this message"
                deleteMessage={handleRevoke}
            />
            <ModalBtn
                label="Delete this message on your side"
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
    );
};

const ModalForMedia = ({
    selectedMessage,
    navigation,
    handleRevoke,
    downLoadImage,
    setShowModal,
    handleDelete,
}) => {
    return (
        <View style={styles.modalBtnContainer}>
            <ModalBtn label="Download media" deleteMessage={downLoadImage} />
            <ModalBtn
                label="Revoke this message"
                deleteMessage={handleRevoke}
            />
            <ModalBtn
                label="Delete this message on your side"
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
    );
};

const ModalForFile = ({
    selectedMessage,
    navigation,
    handleRevoke,
    downLoadFile,
    setShowModal,
    handleDelete,
}) => {
    return (
        <View style={styles.modalBtnContainer}>
            <ModalBtn label="Download file" deleteMessage={downLoadFile} />
            <ModalBtn
                label="Revoke this message"
                deleteMessage={handleRevoke}
            />
            <ModalBtn
                label="Delete this message on your side"
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
                <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={Colors.black}
                />
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
        justifyContent: "center",
    },
    modal: {
        width: Dimensions.get("window").width,
        height: 350,
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
