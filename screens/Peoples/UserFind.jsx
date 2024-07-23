import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { useFetchFriendRecipent } from "../../hooks/FriendRequest/useFetchFriendRecipent";
import { useRevocationFriendRequest } from "../../hooks/FriendRequest/useRevocationFriendRequest";

export default function UserFind({ route }) {
    const { user, token } = useContext(AuthContext);
    const { userfind } = route.params;
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [friendRequestStatus, setFriendRequestStatus] = useState(
        userfind.friendRequest?.status
    );

    const handleSend = async () => {
        try {
            const response = await useFetchFriendRecipent(
                user,
                token,
                userfind.userByPhone._id
            );

            if (response.ok) {
                setFriendRequestStatus(1);
                console.log("Friend request sent successfully");
            } else {
                console.log("Failed to send friend request");
            }
        } catch (error) {
            console.error("Error sending friend request:", error.message);
        }
    };

    const handleRevocation = async () => {
        const response = await useRevocationFriendRequest(
            user,
            token,
            userfind.userByPhone._id
        );
        if (response.status == 200) {
            setFriendRequestStatus(undefined);
            console.log("Friend request revoked successfully");
        }
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.conversationContainer}>
                {/* ---------- AVATAR ---------- */}
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: userfind.userByPhone.avatar }}
                    />
                </View>

                {/* ---------- MESSAGE BOX ---------- */}
                <View style={styles.messageContainer}>
                    {/* ---------- USERNAME ---------- */}
                    <View>
                        <Text style={styles.usernameText}>
                            {userfind.userByPhone.username}
                        </Text>
                    </View>

                    {/* ---------- BIO ---------- */}
                    <View>
                        <Text style={styles.bioText} numberOfLines={3}>
                            {userfind.userByPhone.bio}
                        </Text>
                    </View>
                </View>
            </View>

            {/* ---------- BUTTONS ---------- */}
            <View style={styles.btnContainer}>
                {friendRequestStatus === undefined && (
                    <Pressable onPress={handleSend}>
                        <Text style={styles.btnTextSend}>
                            Send friend request
                        </Text>
                    </Pressable>
                )}
                {friendRequestStatus === 1 && (
                    <View style={styles.action}>
                        <Text style={styles.btnTextSent}>
                            Friend request sent
                        </Text>
                        <Pressable onPress={handleRevocation}>
                            <Text style={styles.btnRevocation}>Revocation</Text>
                        </Pressable>
                    </View>
                )}
                {friendRequestStatus === 2 && (
                    <Text style={styles.btnTextSent}>
                        Friend request accepted
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: Colors.white,
    },
    notFoundText: {
        fontFamily: "medium",
        fontSize: FontSize.medium,
        color: Colors.black,
    },
    cardContainer: {
        // flex: 1,
        borderWidth: 1,
        borderColor: Colors.light_gray,
        borderRadius: 15,
        marginHorizontal: 25,
        marginBottom: 10,
        marginTop: 120,
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: 15,
        backgroundColor: "white",
    },
    conversationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    avatarContainer: {
        borderRadius: 70,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    avatar: {
        height: 70,
        width: 70,
        resizeMode: "cover",
    },
    messageContainer: {
        flex: 1,
        justifyContent: "center",
    },
    usernameText: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
        color: Colors.black,
    },
    bioText: {
        fontFamily: "regular",
        fontSize: FontSize.small,
        color: Colors.dark_gray,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
    },
    btnTextSend: {
        color: Colors.white,
        backgroundColor: Colors.primary,
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
    btnTextSent: {
        color: Colors.black,
        backgroundColor: Colors.white,
        borderRadius: 35,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
    btnSend: {
        color: Colors.dark_gray,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.light_gray,
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },

    btnRevocation: {
        color: Colors.white,
        backgroundColor: Colors.dark_gray,
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.regular,
        marginRight: 10,
    },
    action: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
