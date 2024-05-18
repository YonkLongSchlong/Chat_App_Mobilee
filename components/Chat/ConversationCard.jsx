import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { useListenNotification } from "../../hooks/ListenSocket";
import { formatTime } from "../../utils/FormatTime";

export default function ConversationCard({ convers }) {
    const navigation = useNavigation();
    const [conversation, setConversation] = useState(convers);
    const { user } = useContext(AuthContext);
    const lastMessage = conversation.lastMessage;
    const check =
        lastMessage?.messageType == "image"
            ? "image"
            : lastMessage?.messageType == "file"
            ? "file"
            : lastMessage?.messageType == "video"
            ? "video"
            : "text";
    const route =
        conversation.conversationType === "1v1" ? "Chat1to1" : "ChatGroup";
    let participant = {};
    if (conversation.conversationType === "1v1") {
        conversation.participants.forEach((userToChat) => {
            if (userToChat._id != user._id) {
                participant = userToChat;
            }
        });
    }

    console.log("Render Conversation card");
    /* LẮNG NGHE SOCKET */
    useListenNotification(conversation, setConversation);

    return (
        <>
            <Pressable
                style={styles.container}
                onPress={() =>
                    navigation.navigate(`${route}`, {
                        participant,
                        convers: conversation,
                    })
                }
            >
                <View style={styles.conversationContainer}>
                    {/* ---------- AVARTA ---------- */}
                    <View style={styles.avartaContainer}>
                        <Image
                            style={{
                                height: 65,
                                width: 65,
                                resizeMode: "cover",
                            }}
                            source={{
                                uri:
                                    conversation.conversationType == "1v1"
                                        ? `${participant?.avatar}`
                                        : `${conversation.conversationImage}`,
                            }}
                        />
                    </View>

                    {/* ---------- MESSAGE BOX ---------- */}
                    <View style={styles.messageContainer}>
                        {/* USERNAME */}
                        <View>
                            <Text style={styles.usernameText}>
                                {conversation.status !== undefined
                                    ? conversation.name
                                    : participant?.username}
                            </Text>
                        </View>

                        {/* ---------- LASTEST MESSAGE ---------- */}
                        <View>
                            {!lastMessage ? null : (
                                <Text
                                    style={styles.messageText}
                                    numberOfLines={1}
                                >
                                    {check == "image"
                                        ? "Image"
                                        : check == "file"
                                        ? "File"
                                        : check == "video"
                                        ? "Video"
                                        : `${lastMessage?.message}`}
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* ---------- TIME OF LAST MESSAGE ---------- */}
                    <View>
                        {!lastMessage ? (
                            <Text style={styles.timeText}>
                                {formatTime(conversation.createdAt)}
                            </Text>
                        ) : (
                            <Text style={styles.timeText}>
                                {formatTime(lastMessage?.createdAt)}
                            </Text>
                        )}
                    </View>
                </View>

                {/* ---------- SEPARATOR ---------- */}
                <View
                    style={{
                        paddingLeft: 105,
                        height: 1,
                        width: StyleSheet.hairlineWidth,
                        backgroundColor: "white",
                    }}
                ></View>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    conversationContainer: {
        flex: 1,
        backgroundColor: "white",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 20,
    },
    avartaContainer: {
        borderRadius: 70,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    messageContainer: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        gap: 5,
    },
    usernameText: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
        color: Colors.black,
    },
    messageText: {
        fontFamily: "regular",
        fontSize: FontSize.regular,
        color: Colors.dark_gray,
    },
    timeText: {
        fontFamily: "regular",
        fontSize: FontSize.small,
        color: Colors.dark_gray,
    },
});
