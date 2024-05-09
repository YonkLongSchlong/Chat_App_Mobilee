import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import useDeleteMemberOutGroup from "../../hooks/ChatGroup/useDeleteMemberOutGroup";

const ListMembers = ({ route }) => {
    const { conversation } = route.params;
    const { token, user } = useContext(AuthContext);
    const [members, setMembers] = useState(conversation.participants);
    const { deleteMember } = useDeleteMemberOutGroup();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();

    const handleDeleteMember = async (memberId) => {
        try {
            if (memberId !== user._id) {
                await deleteMember(token, conversation._id, memberId);
                navigation.goBack();
            } else {
                setShowConfirmation(true);
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

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
                    renderItem={({ item }) => (
                        <UserCard
                            item={item}
                            setShowConfirmation={setShowConfirmation}
                            conversation={conversation}
                        />
                    )}
                    keyExtractor={(item) => item._id}
                />

                {showConfirmation && (
                    <View style={styles.confirmationContainer}>
                        <Pressable
                            onPress={setShowConfirmation(false)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonConfirm]}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    styles.buttonTextConfirm,
                                ]}
                            >
                                Remove this user
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const UserCard = ({ item, setShowConfirmation, conversation }) => {
    return (
        <View style={styles.memberContainer}>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: `${item.avatar}`,
                    }}
                />
                <Text style={styles.memberName}>{item.username}</Text>
            </View>

            {conversation.status === 1 ? (
                <View style={styles.iconContainer}>
                    <Pressable onPress={() => setShowConfirmation(true)}>
                        <Ionicons
                            name="add-circle"
                            size={22}
                            color={Colors.primary}
                        />
                    </Pressable>
                    <Pressable onPress={() => setShowConfirmation(true)}>
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
    buttonText: {
        fontSize: 16,
    },
    buttonConfirm: {
        backgroundColor: "red",
        borderColor: "red",
    },
    buttonTextConfirm: {
        color: "white",
    },
});

export default ListMembers;
