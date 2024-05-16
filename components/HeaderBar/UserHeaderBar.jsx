import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Plus, QrCode, Search } from "lucide-react-native";

export default function UserHeaderBar() {
    const navigation = useNavigation();

    const handlePlus = async () => {
        navigation.navigate("SelectChatGroup");
    };
    return (
        <View style={styles.wrapContainer}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <Search size={24} color={"black"} />
                </TouchableOpacity>
                <TextInput style={styles.textInput} placeholder="Search" />
                <TouchableOpacity onPress={handlePlus}>
                    <Plus size={24} color={"black"} />
                </TouchableOpacity>
                <QrCode size={24} color={"black"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapContainer: {
        width: "100%",
        height: 70,
        justifyContent: "center",
        marginBottom: 5,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "white",
        marginHorizontal: 15,
        borderRadius: 10,
    },
    textInput: {
        fontFamily: "regular",
        flex: 1,
    },
});
