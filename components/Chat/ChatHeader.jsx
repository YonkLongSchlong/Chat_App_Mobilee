import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ChatHeader({ onCall, onVideoCall, participant }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
            }}
        >
            <View style={styles.container}>
                {/* ---------- CONVERSATION NAME CONTAINER ---------- */}
                <View style={styles.headerView}>
                    <Pressable
                        style={styles.backBtnContainer}
                        onPress={() => navigation.popToTop()}
                    >
                        <ArrowLeft size={24} color={Colors.black} />
                    </Pressable>
                    <View style={styles.avartaContainer}>
                        <Image
                            style={{
                                height: 45,
                                width: 45,
                                resizeMode: "cover",
                            }}
                            source={{ uri: `${participant.avatar}` }}
                        />
                    </View>
                    <Text style={styles.headerText}>
                        {participant.username}
                    </Text>
                </View>

                {/* ---------- ICON CONTAINER ---------- */}
                <View style={styles.iconContainer}>
                    <Pressable onPress={onCall}>
                        <Ionicons
                            name="call-outline"
                            size={22}
                            color={Colors.primary}
                        />
                    </Pressable>
                    <Pressable onPress={onVideoCall}>
                        <Ionicons
                            name="videocam-outline"
                            size={22}
                            color={Colors.primary}
                        />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 15,
    },
    backBtnContainer: {
        marginRight: 5,
    },
    headerText: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
    iconContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
    },
    avartaContainer: {
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
});
