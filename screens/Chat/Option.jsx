import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
import { useLeaveGroupChat } from "../../hooks/ChatGroup";
import { useCloseGroupChat } from "../../hooks/ChatGroup/useCloseGroupChat";

const Option = () => {
    const navigation = useNavigation();
    const { conversation, setConversation } = useContext(ConversationContext);
    const { token } = useContext(AuthContext);

    return (
        <SafeAreaView
            style={{ flex: 1, paddingTop: 80, backgroundColor: Colors.white }}
        >
            <View style={styles.container}>
                <View style={styles.avartarContainer}>
                    <Pressable
                        style={styles.iconBtn}
                        onPress={() => pickImage()}
                    >
                        <Image
                            source={{ uri: conversation.conversationImage }}
                            style={{
                                width: 100,
                                height: 100,
                                borderWidth: 0,
                                borderRadius: 75,
                            }}
                        />
                    </Pressable>
                </View>
                {/* ------------- UTILITY BUTTON CONTAINER ------------- */}
                <View style={styles.btnContainerHeader}>
                    <Text style={styles.header}>Chat info</Text>
                </View>
                <View style={styles.utilityBtnContainer}>
                    <UtilityBtn
                        label={"Add members"}
                        navigation={navigation}
                        icon={"person-add"}
                        route={"AddFriendIntoGroup"}
                        conversation={conversation}
                    />
                    <View style={styles.separator}></View>
                    <UtilityBtn
                        label={"See members"}
                        navigation={navigation}
                        icon={"people"}
                        route={"ListMembers"}
                        conversation={conversation}
                    />
                </View>

                {/* ------------- TERMINATE BUTTON CONTAINER ------------- */}
                <View style={styles.btnContainerHeader}>
                    <Text style={styles.header}>Privacy & support</Text>
                </View>
                <View style={styles.terminateBtnContainer}>
                    <LeaveBtn
                        label={"Leave group"}
                        navigation={navigation}
                        icon={"exit"}
                        route={"Dashboard"}
                        token={token}
                        conversation={conversation}
                    />
                    <View
                        style={[
                            styles.separator,
                            { backgroundColor: "#e35252" },
                        ]}
                    ></View>
                    <DisolveBtn
                        label={"Disolve group"}
                        icon={"trash"}
                        token={token}
                        conversation={conversation}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const UtilityBtn = (props) => {
    const conversation = props.conversation;
    return (
        <>
            <Pressable
                style={styles.utilityBtn}
                onPress={() => {
                    if (
                        props.label !== "See members" &&
                        conversation.status === 2
                    ) {
                        ToastAndroid.show(
                            "This group have been disolved",
                            ToastAndroid.SHORT
                        );
                    } else {
                        props.navigation.navigate(props.route);
                    }
                }}
            >
                <Ionicons
                    name={props.icon}
                    size={22}
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.buttonText}>{props.label}</Text>
            </Pressable>
        </>
    );
};

const DisolveBtn = (props) => {
    const handleDisbandGroup = async () => {
        const response = await useCloseGroupChat(
            props.token,
            props.conversation._id
        );
        if (response.status === 200) {
            ToastAndroid.show(
                "Group disolved successfully",
                ToastAndroid.SHORT
            );
        }
    };

    return (
        <Pressable style={styles.terminateBtn} onPress={handleDisbandGroup}>
            <Ionicons
                name={props.icon}
                size={22}
                color="#e35252"
                style={styles.icon}
            />
            <Text style={styles.terminateBtnText}>{props.label}</Text>
        </Pressable>
    );
};

const LeaveBtn = (props) => {
    const { user } = useContext(AuthContext);

    const handleDisbandGroup = async () => {
        if (props.conversation.status === 2) {
            const response = await useLeaveGroupChat(
                props.token,
                props.conversation._id
            );
            if (response.status === 200) {
                props.navigation.navigate(props.route);
                ToastAndroid.show(
                    "You have leave the group",
                    ToastAndroid.SHORT
                );
            }
        } else if (
            props.conversation.admin.includes(user._id.toString()) &&
            props.conversation.admin.length == 1
        ) {
            ToastAndroid.show(
                "There is only one admin and that is you, please add someone to be an admin before you leave",
                ToastAndroid.LONG
            );
        }
    };

    return (
        <>
            <Pressable style={styles.terminateBtn} onPress={handleDisbandGroup}>
                <Ionicons
                    name={props.icon}
                    size={22}
                    color="#e35252"
                    style={styles.icon}
                />
                <Text style={styles.terminateBtnText}>{props.label}</Text>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    avartarContainer: {
        width: 120,
        height: 120,
        backgroundColor: Colors.white,
        marginBottom: 10,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: "#ECECED",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "cover",
    },
    btnContainerHeader: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    header: {
        fontSize: FontSize.regular,
        fontFamily: "medium",
        color: Colors.dark_gray,
    },
    utilityBtnContainer: {
        backgroundColor: Colors.primary,
        alignItems: "flex-start",
        width: "90%",
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    terminateBtnContainer: {
        backgroundColor: Colors.white,
        alignItems: "flex-start",
        width: "90%",
        paddingHorizontal: 20,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 0.9,
        borderColor: "#e35252",
    },
    utilityBtn: {
        alignItems: "center",
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        gap: 5,
    },
    terminateBtn: {
        alignItems: "center",
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        gap: 5,
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.white,
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontSize: FontSize.regular,
        marginLeft: 10,
        fontFamily: "medium",
    },
    terminateBtnText: {
        color: "#e35252",
        fontSize: FontSize.regular,
        marginLeft: 10,
        fontFamily: "medium",
    },
    icon: {
        marginRight: 10,
    },
});

export default Option;
