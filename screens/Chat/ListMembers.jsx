import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
import { useAddPermission, useRemoveParticipant } from "../../hooks/ChatGroup";

export default ListMembers = () => {
    const { conversation, setConversation } = useContext(ConversationContext);
    const { token } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [options, setOptions] = useState("");
    const [selectedUser, setSelectedUser] = useState({});

    console.log("Render List members");
    useEffect(() => {
        setMembers(conversation.participants);
    }, [conversation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={styles.container}>
                <View style={styles.countContainer}>
                    <Text style={styles.countText}>
                        {members.length} members
                    </Text>
                </View>
                <FlatList
                    data={members}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <UserCard
                            item={item}
                            setShowModal={setShowModal}
                            conversation={conversation}
                            setOptions={setOptions}
                            setSelectedUser={setSelectedUser}
                        />
                    )}
                />

                <ConfirmationModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    options={options}
                    conversation={conversation}
                    setConversation={setConversation}
                    token={token}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </View>
        </SafeAreaView>
    );
};

const UserCard = ({
    item,
    setShowModal,
    conversation,
    setOptions,
    setSelectedUser,
}) => {
    const handleBtnAddPermission = () => {
        setShowModal(true);
        setOptions("admin");
        setSelectedUser(item);
    };

    const handleBtnRemoveUser = () => {
        setShowModal(true);
        setOptions("remove");
        setSelectedUser(item);
    };

    return (
        <View style={styles.memberContainer}>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: `${item.avatar}`,
                    }}
                />
                <View style={styles.usernameContainer}>
                    <Text style={styles.memberName}>{item.username}</Text>
                    {conversation.admin.includes(item._id) ? (
                        <Text style={styles.roleText}>Admin</Text>
                    ) : null}
                </View>
            </View>

            {conversation.status === 1 ? (
                <View style={styles.iconContainer}>
                    <Pressable onPress={() => handleBtnAddPermission()}>
                        <Ionicons
                            name="add-circle"
                            size={22}
                            color={Colors.primary}
                        />
                    </Pressable>
                    <Pressable onPress={() => handleBtnRemoveUser()}>
                        <Ionicons
                            name="close-circle"
                            size={22}
                            color={Colors.dark_gray}
                        />
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
};

const ConfirmationModal = ({
    showModal,
    setShowModal,
    options,
    conversation,
    setConversation,
    token,
    selectedUser,
    setSelectedUser,
}) => {
    const handleAddPermission = async () => {
        const data = await useAddPermission(
            token,
            conversation._id,
            selectedUser._id
        );
        if (data) {
            setConversation(data);
        }
        setSelectedUser(null);
        setShowModal(false);
    };

    const handleRemoveUser = async () => {
        const data = await useRemoveParticipant(
            token,
            conversation._id,
            selectedUser._id
        );
        if (data) {
            setConversation(data);
        }
        setSelectedUser(null);
        setShowModal(false);
    };

    const handleCancel = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    return (
        <Modal visible={showModal} animationType="fade" transparent={true}>
            <View style={styles.modalViewContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.confirmText}>
                            {options === "admin"
                                ? "Do you want to grant admin permission to this user ?"
                                : "Do you want to remove this user from this conversation ?"}
                        </Text>
                    </View>
                    <View style={styles.modalBtnContainer}>
                        <Pressable
                            style={styles.cancelBtn}
                            onPress={() => handleCancel()}
                        >
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={styles.confirmBtn}
                            onPress={() =>
                                options === "admin"
                                    ? handleAddPermission()
                                    : handleRemoveUser()
                            }
                        >
                            <Text style={styles.confirmBtnText}>Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 60,
        borderTopColor: "#ccc",
    },
    countContainer: {
        marginVertical: 10,
    },
    countText: {
        fontSize: FontSize.small,
        fontFamily: "semiBold",
        color: Colors.dark_gray,
    },
    memberContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    usernameContainer: {
        justifyContent: "center",
    },
    avatar: {
        width: 45,
        height: 45,
        resizeMode: "cover",
        borderRadius: 45,
    },
    memberName: {
        fontSize: FontSize.regular,
        fontFamily: "medium",
    },
    roleText: {
        fontSize: FontSize.small,
        fontFamily: "regular",
        color: Colors.dark_gray,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    confirmationContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    modalViewContainer: {
        position: "absolute",
        bottom: Dimensions.get("screen").height / 2 - 80,
        left: Dimensions.get("screen").width / 2 - 140,
        width: 280,
        height: 160,
        borderRadius: 15,
        backgroundColor: Colors.light_gray,
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
    },
    modalTextContainer: {
        alignItems: "center",
        paddingHorizontal: 11,
        width: "100%",
    },
    modalBtnContainer: {
        flexDirection: "row",
        gap: 15,
        marginTop: 15,
    },
    confirmBtnText: {
        fontSize: FontSize.regular,
        fontFamily: "medium",
        color: Colors.white,
    },
    cancelBtnText: {
        fontSize: FontSize.regular,
        fontFamily: "medium",
        color: Colors.black,
    },
    confirmBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    cancelBtn: {
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    confirmText: {
        fontSize: FontSize.regular,
        fontFamily: "medium",
        color: Colors.white,
    },
});
