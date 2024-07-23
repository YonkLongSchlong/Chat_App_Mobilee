import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import * as Contacts from "expo-contacts";
import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeaderBar from "../../components/HeaderBar/SettingsHeaderBar";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { FriendRequestsSentContext } from "../../context/FriendRequestSentContext";
import { FriendsContext } from "../../context/FriendsContext";
import { useFetchFriendRecipent } from "../../hooks/FriendRequest/useFetchFriendRecipent";

export default function Contact() {
    const [users, setUsers] = useState(null);
    const { user, token } = useContext(AuthContext);
    const [contacts, setContacts] = useState(null);

    /* GET CONTACTS FROM LOCAL PHONE */
    const getContact = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status) {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });
            if (data.length > 0) {
                setContacts(data);
                const phones = data.map((user) => {
                    return user.phoneNumbers[0].number.replace(/\s/g, "");
                });
                await handleContact(phones);
            }
        }
    };

    /* HANDLE REQUEST FIND USER BY CONTACTS */
    const handleContact = async (phones) => {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + `/user/${user._id}/findByPhones`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    phones: phones,
                }),
            }
        );
        if (response.status === 204) {
            setUsers(null);
        } else {
            const userList = await response.json();
            setUsers(userList);
        }
    };

    useEffect(() => {
        getContact();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 55 }}>
                <SettingsHeaderBar />
                <View style={{ marginTop: 10, height: "100%" }}>
                    {users ? (
                        <FlashList
                            data={users}
                            renderItem={({ item, index }) => (
                                <ContactCard
                                    item={item}
                                    contacts={contacts}
                                    index={index}
                                />
                            )}
                            estimatedItemSize={10}
                        />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator />
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const ContactCard = ({ item, contacts, index }) => {
    const { friends } = useContext(FriendsContext);
    const { friendRequestsSent, setFriendRequestsSent } = useContext(
        FriendRequestsSentContext
    );

    const { user, token } = useContext(AuthContext);
    const navigation = useNavigation();
    const [isSent, setIsSent] = useState(false);
    let isFriends = false;
    friends.forEach((friend) => {
        if (friend._id === item._id) {
            return (isFriends = true);
        }
    });

    const handleSendFriendsRequest = async () => {
        const response = await useFetchFriendRecipent(user, token, item._id);
        const data = await response.json();
        if (response.ok) {
            setIsSent(true);
            // setFriendRequestsSent((friendRequestsSent) => [
            //     ...friendRequestsSent,
            //     data,
            // ]);
        } else {
            return;
        }
    };

    return (
        <View>
            <View style={styles.cardContainer}>
                <View style={styles.userContainer}>
                    {/* ---------- AVARTA ---------- */}
                    <View style={styles.avartaContainer}>
                        <Image
                            style={{
                                height: 55,
                                width: 55,
                                resizeMode: "cover",
                            }}
                            source={{ uri: `${item.avatar}` }}
                        />
                    </View>

                    {/* ---------- USERNAME ---------- */}
                    <View style={styles.nameContainer}>
                        <Text style={styles.usernameText}>{item.username}</Text>
                        <Text style={styles.contactNameText}>
                            Contact name: {contacts[index].name}
                        </Text>
                    </View>
                </View>

                {/* ---------- ADD FRIEND BUTTON ---------- */}
                {isFriends ? (
                    <View>
                        <Text style={styles.alreadyFriendBtn}>
                            Already friends
                        </Text>
                    </View>
                ) : (
                    <>
                        {!isSent ? (
                            <Pressable onPress={handleSendFriendsRequest}>
                                <Text style={styles.btnAdd}>Add friend</Text>
                            </Pressable>
                        ) : (
                            <View>
                                <Text style={styles.btnSent}>Revoke</Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "white",
        height: 82,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    userContainer: {
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
    nameContainer: {
        gap: 2,
    },
    usernameText: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
    contactNameText: {
        fontFamily: "regular",
        fontSize: FontSize.small,
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
    btnSent: {
        color: Colors.white,
        backgroundColor: Colors.light_gray,
        borderWidth: 1,
        borderColor: Colors.light_gray,
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.small,
    },
    alreadyFriendBtn: {
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
