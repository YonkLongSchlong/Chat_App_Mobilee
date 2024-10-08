import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
import { FriendsContext } from "../../context/FriendsContext";
import useAddFriendGroup from "../../hooks/ChatGroup/useAddFriendGroup";

const AddFriendIntoGroup = () => {
    const [selectedFriends, setSelectedFriends] = useState([]);
    const { friends } = useContext(FriendsContext);
    const [friendList, setFriendList] = useState([]);
    const { token } = useContext(AuthContext);
    const navigation = useNavigation();
    const { conversation, setConversation } = useContext(ConversationContext);

    useEffect(() => {
        const results = friends.filter(
            ({ _id: id1 }) =>
                !conversation.participants.some(({ _id: id2 }) => id2 === id1)
        );
        setFriendList(results);
    }, []);

    const renderFriendItem = ({ item }) => (
        <TouchableOpacity
            style={styles.friendItem}
            onPress={() => handleCheckBoxChange(item._id)}
        >
            <View style={styles.friendInfo}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.friendName}>{item.username}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.checkboxContainer,
                    {
                        backgroundColor: selectedFriends.includes(item._id)
                            ? "#007AFF"
                            : "transparent",
                    },
                ]}
                onPress={() => handleCheckBoxChange(item._id)}
            >
                <View style={styles.checkbox}></View>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const handleCheckBoxChange = (friendId) => {
        const isSelected = selectedFriends.includes(friendId);
        if (isSelected) {
            setSelectedFriends(
                selectedFriends.filter((_id) => _id !== friendId)
            );
        } else {
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };

    const addFriendIntoGroup = async () => {
        if (selectedFriends.length > 0) {
            const data = await useAddFriendGroup(
                token,
                conversation._id,
                selectedFriends
            );
            if (data) {
                setConversation(data);
                navigation.goBack();
            } else {
                return;
            }
        } else {
            ToastAndroid.show(
                "Please select a friend to add to group",
                ToastAndroid.SHORT
            );
        }
    };

    const selectedFriendItems = selectedFriends.map((friendId) => {
        const friend = friends.find((item) => item._id === friendId);

        return (
            <View style={styles.selectedFriendItem} key={friend._id}>
                <View style={styles.friendContainer}>
                    <Image
                        source={{ uri: friend.avatar }}
                        style={styles.avatar}
                    />
                    <Text style={styles.friendName}>{friend.username}</Text>
                </View>
                <Pressable onPress={() => removeSelectedFriend(friend._id)}>
                    <Ionicons
                        name="close-circle"
                        size={22}
                        color={Colors.dark_gray}
                    />
                </Pressable>
            </View>
        );
    });

    const removeSelectedFriend = (friendId) => {
        setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Danh sách bạn bè</Text>
            {friendList.length > 0 && (
                <FlatList
                    data={friendList}
                    renderItem={renderFriendItem}
                    style={styles.friendList}
                />
            )}
            <Text style={styles.selectedHeading}>Selected members</Text>
            <ScrollView style={styles.selectedFriendList}>
                {selectedFriendItems}
            </ScrollView>
            <TouchableOpacity
                style={styles.btnAdd}
                onPress={addFriendIntoGroup}
            >
                <Text style={styles.textBtnAdd}>Thêm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 80,
        alignItems: "center",
    },
    heading: {
        fontSize: 24,
        marginBottom: 10,
    },
    friendInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    friendList: {
        flex: 1,
        width: "100%",
    },
    friendItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    selectedFriendItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.light_gray,
    },
    friendContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },

    checkboxContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#007AFF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedHeading: {
        marginBottom: 10,
        fontFamily: "semiBold",
    },
    selectedFriendList: {
        flex: 1,
        width: "100%",
        marginBottom: 10,
    },
    btnAdd: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.primary,
    },
    textBtnAdd: {
        fontSize: 18,
        color: Colors.white,
    },
});

export default AddFriendIntoGroup;
