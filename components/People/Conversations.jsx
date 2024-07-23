import { useNavigation } from "@react-navigation/native";
import { Phone, Video } from "lucide-react-native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import FontSize from "../../constants/FontSize";

export default function Conversation({ group }) {
    const navigate = useNavigation();

    const handleNavigation = () => {
        navigate.navigate("ChatGroup", {
            convers: group,
        });
    };

    return (
        <Pressable onPress={handleNavigation}>
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Image
                        source={{ uri: `${group.conversationImage}` }}
                        style={styles.image}
                    />
                    <Text style={styles.usernameText}>{group.name}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Pressable>
                        <Phone size={20} color={"black"} />
                    </Pressable>
                    <Pressable>
                        <Video size={20} color={"black"} />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
    usernameContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 70,
    },
    usernameText: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
    },
});
