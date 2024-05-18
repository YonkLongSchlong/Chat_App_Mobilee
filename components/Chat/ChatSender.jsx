import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

const ChatSender = ({ item, setShowModal, setSelectedMessage }) => {
    const messageType = item.messageType;
    const navigation = useNavigation();
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
            onPress={() => {
                if (messageType === "image") {
                    navigation.navigate("ImageView", {
                        item,
                    });
                } else if (messageType === "video") {
                    navigation.navigate("VideoView", {
                        item,
                    });
                }
            }}
        >
            <View style={styles.messageBubble}>
                {messageType == "image" ? (
                    <>
                        <Image
                            source={{ uri: item.messageUrl }}
                            style={styles.image}
                        />
                        <Text style={styles.timeText}>
                            {formatTime(item.createdAt)}
                        </Text>
                    </>
                ) : messageType == "text" ? (
                    <>
                        <Text style={styles.messageText}>{item.message}</Text>
                        <Text style={styles.timeText}>
                            {formatTime(item.createdAt)}
                        </Text>
                    </>
                ) : messageType == "file" ? (
                    <>
                        <View style={styles.messageFileContainer}>
                            <Ionicons
                                name="file-tray-outline"
                                size={30}
                                color={Colors.black}
                            />
                            <Text numberOfLines={1} style={styles.messageText}>
                                {item.message}
                            </Text>
                        </View>
                        <Text style={styles.timeText}>
                            {formatTime(item.createdAt)}
                        </Text>
                    </>
                ) : (
                    <>
                        <Video
                            style={styles.video}
                            source={{ uri: `${item.messageUrl}` }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                        />
                        <Text style={styles.timeText}>
                            {formatTime(item.createdAt)}
                        </Text>
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
        overflow: "hidden",
        alignItems: "center",
    },
    video: {
        width: 220,
        height: 220,
        borderRadius: 10,
    },
});

export default ChatSender;
