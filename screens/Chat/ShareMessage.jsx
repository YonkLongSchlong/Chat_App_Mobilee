import { useContext, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeaderBar from "../../components/HeaderBar/SettingsHeaderBar";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/AuthContext";
import { ConversationsContext } from "../../context/ConversationsContext";
import { FriendsContext } from "../../context/FriendsContext";
import { useShareGroupChatMessage } from "../../hooks/ChatGroup";
import { useShareMessage } from "../../hooks/Messages/index";

export const ShareMessage = ({ route }) => {
    const { selectedMessage } = route.params;
    const { friends } = useContext(FriendsContext);
    const { conversations } = useContext(ConversationsContext);
    const list = conversations.filter((conversation) => {
        return conversation.conversationType === "Group";
    });
    const shareList = list.concat(friends);
    const { token } = useContext(AuthContext);

    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={styles.container}>
                <SettingsHeaderBar />
                <View style={styles.listContainer}>
                    <FlatList
                        data={shareList}
                        renderItem={({ item }) => {
                            return (
                                <FriendCard
                                    item={item}
                                    selectedMessage={selectedMessage}
                                    token={token}
                                />
                            );
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const FriendCard = ({ item, selectedMessage, token }) => {
    const [isSent, setIsSent] = useState(false);

    const handleShareFriend = async () => {
        const data = await useShareMessage(
            token,
            item._id,
            selectedMessage._id
        );
        if (data) {
            setIsSent(true);
            ToastAndroid.show("Message share successfully", ToastAndroid.LONG);
        }
    };

    const handleShareGroup = async () => {
        const data = await useShareGroupChatMessage(
            token,
            item._id,
            selectedMessage._id
        );
        if (data) {
            setIsSent(true);
            ToastAndroid.show("Message share successfully", ToastAndroid.LONG);
        }
    };

    return (
        <Pressable>
            <View style={styles.cardContainer}>
                <View style={styles.usernameContainer}>
                    <View style={styles.avartaContainer}>
                        <Image
                            source={{
                                uri: item.avatar
                                    ? `${item.avatar}`
                                    : `${item.conversationImage}`,
                            }}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.usernameText}>
                        {item.username ? item.username : item.name}
                    </Text>
                </View>
                <View>
                    <Pressable
                        onPress={
                            item.conversationImage == undefined
                                ? handleShareFriend
                                : handleShareGroup
                        }
                    >
                        <Text
                            style={!isSent ? styles.btnAdd : styles.btnAddSent}
                        >
                            {!isSent ? "Send" : "Sent"}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: 20,
    },
    listContainer: {
        marginTop: 25,
        height: "100%",
    },
    cardContainer: {
        backgroundColor: "white",
        height: 82,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        gap: 20,
    },
    usernameContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    avartaContainer: {
        borderRadius: 70,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    image: {
        width: 55,
        height: 55,
        resizeMode: "cover",
    },
    usernameText: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
    btnAdd: {
        color: Colors.white,
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: Colors.light_gray,
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.small,
    },
    btnAddSent: {
        color: Colors.black,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.light_gray,
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.small,
    },
});
