import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { FriendsContext } from "../../context/FriendsContext";
import { useCreateGroupChat } from "../../hooks/ChatGroup/useFetchCreateGroup";

const SelectChatGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]);
    const { user, token } = useContext(AuthContext);
    const navigation = useNavigation();
    const { friends } = useContext(FriendsContext);

    const handleInputChange = (text) => {
        setGroupName(text);
    };

    const renderFriendItem = ({ item }) => (
        <Pressable
            style={styles.friendItem}
            onPress={() => handleCheckBoxChange(item._id)}
        >
            <View style={styles.friendInfo}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.friendName}>{item.username}</Text>
            </View>
            <Pressable
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
            </Pressable>
        </Pressable>
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

    const createGroup = async () => {
        if (selectedFriends.length > 1 && groupName.length > 0) {
            try {
                await useCreateGroupChat(
                    user,
                    token,
                    selectedFriends,
                    groupName
                );
                Alert.alert("Notice", "Create group successfully");
                navigation.navigate("Dashboard");
            } catch (error) {
                ToastAndroid.show(error.message, ToastAndroid.LONG);
            }
        } else if (groupName.length <= 0) {
            ToastAndroid.show("Please enter a group name", ToastAndroid.LONG);
        } else {
            ToastAndroid.show(
                "Group need to have at least two selected members",
                ToastAndroid.LONG
            );
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, paddingTop: 60, backgroundColor: "white" }}
        >
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Group name"
                        value={groupName}
                        onChangeText={handleInputChange}
                    />
                    <Pressable style={styles.btnNext} onPress={createGroup}>
                        <Text style={styles.textBtnNext}>Create</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={friends}
                    renderItem={renderFriendItem}
                    style={styles.friendList}
                />
                <Text style={styles.selectedHeading}>Selected members</Text>
                <ScrollView style={styles.selectedFriendList}>
                    {selectedFriendItems}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        marginBottom: 10,
        fontFamily: "semiBold",
        fontSize: FontSize.regular,
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 7,
        width: "70%",
        color: Colors.dark_gray,
        fontFamily: "medium",
        fontSize: FontSize.regular,
        borderColor: Colors.light_gray,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
    searchInput: {
        width: "100%",
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    friendList: {
        flex: 1,
        width: "100%",
        marginTop: 10,
    },
    friendItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.light_gray,
    },
    friendInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 45,
        resizeMode: "cover",
    },
    friendName: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
    checkboxContainer: {
        width: 17,
        height: 17,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedHeading: {
        marginBottom: 10,
        fontFamily: "semiBold",
        fontSize: FontSize.regular,
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
    selectedFriendName: {
        fontSize: FontSize.regular,
        fontFamily: "regular",
    },
    selectedFriendList: {
        flex: 1,
        width: "100%",
        marginBottom: 10,
    },
    btnNext: {
        borderRadius: 5,
        width: "28%",
        height: 45,
        backgroundColor: Colors.primary,
        justifyContent: "center",
    },
    textBtnNext: {
        fontSize: FontSize.regular,
        fontFamily: "medium",
        color: Colors.white,
        textAlign: "center",
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
});

export default SelectChatGroup;
