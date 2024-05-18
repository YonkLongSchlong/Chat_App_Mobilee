import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

const ChatReceiver = ({
    item,
    setShowModal,
    setSelectedMessage,
    participants,
    participant,
}) => {
    const messageType = item.messageType;
    const navigation = useNavigation();
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
            <View style={styles.userAvatarContainer}>
                <Image
                    style={styles.userAvatar}
                    source={{
                        uri: `${
                            user.avatar == undefined
                                ? "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                                : user.avatar
                        }`,
                    }}
                />
            </View>
            <View style={styles.messageContainer}>
                <View style={styles.messageBubble}>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.username}>
                            {user.username == undefined
                                ? "removed user"
                                : user.username}
                        </Text>
                    </View>
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
                            <Text style={styles.messageText}>
                                {item.message}
                            </Text>
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
                                <Text
                                    numberOfLines={1}
                                    style={styles.messageTextFile}
                                >
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
    messageTextFile: {
        fontSize: FontSize.regular,
        color: Colors.black,
        lineHeight: 20,
        fontFamily: "regular",
        marginBottom: 10,
    },
    image: {
        width: 220,
        height: 220,
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

export default ChatReceiver;
