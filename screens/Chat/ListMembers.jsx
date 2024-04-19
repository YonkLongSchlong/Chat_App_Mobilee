import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { useListMembersInGroup } from "../../hooks/ChatGroup/useListMemberInGroup";
import { AuthContext } from "../../context/AuthContext";
import { Delete } from "lucide-react-native";
import useDeleteMemberOutGroup from "../../hooks/ChatGroup/useDeleteMemberOutGroup";
import { useCloseGroupChat } from "../../hooks/ChatGroup/useCloseGroupChat";
import { useNavigation } from "@react-navigation/native";

const ListMembers = ({ route }) => {
    const { conversation } = route.params;
    const { token, user } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const { deleteMember } = useDeleteMemberOutGroup();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await useListMembersInGroup(token, conversation._id);
                setMembers(data);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, [token, conversation._id]);

    const handleDeleteMember = async (memberId) => {
        console.log("Delete member with id:", memberId);
        console.log("Current user id:", user._id);
        try {
            if (memberId !== user._id) {
                await deleteMember(token, conversation._id, memberId);
                navigation.goBack();
            }
            else{
                setShowConfirmation(true);
            }
            
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const closeAndDissolveGroup = async () => {
        try {
            await useCloseGroupChat(token, conversation._id);
        } catch (error) {
            console.error("Error closing group chat:", error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={members}
                renderItem={({ item }) => (
                    <View style={styles.memberContainer}>
                        <Text style={styles.memberName}>{item.username}</Text>
                        <TouchableOpacity onPress={() => handleDeleteMember(item._id)}>
                            <Delete size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />

            {showConfirmation && (
                <View style={styles.confirmationContainer}>
                    <TouchableOpacity onPress={() => setShowConfirmation(false)} style={styles.button}>
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closeAndDissolveGroup} style={[styles.button, styles.buttonConfirm]}>
                        <Text style={[styles.buttonText, styles.buttonTextConfirm]}>Giải tán nhóm</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 70,
        borderTopColor: "#ccc",
    },
    memberContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
    },
    memberName: {
        fontSize: 18,
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
