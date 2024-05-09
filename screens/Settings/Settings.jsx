import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import {
    BellRing,
    ChevronRight,
    LogOut,
    ShieldCheck,
    Sliders,
    UserRound,
} from "lucide-react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import SettingsHeaderBar from "../../components/HeaderBar/SettingsHeaderBar";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

export default function Settings() {
    const { logout } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <SettingsHeaderBar />
            <ScrollView style={styles.settingsCardContainer}>
                <SettingCard label="User" icon={UserRound} />
                <SettingCard label="General" icon={Sliders} />
                <SettingCard label="Notification" icon={BellRing} />
                <SettingCard label="Privacy" icon={ShieldCheck} />
                <LogoutCard label="Log out" icon={LogOut} logout={logout} />
            </ScrollView>
        </View>
    );
}

const SettingCard = (props) => {
    const navigation = useNavigation();
    const handleNavigation = (props) => {
        navigation.navigate(props.label + "Settings");
    };

    return (
        <Pressable
            style={styles.cardContainer}
            onPress={() => {
                handleNavigation(props);
            }}
        >
            <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                    <props.icon size={24} color={Colors.white} />
                </View>
                <Text style={styles.labelText}>{props.label}</Text>
            </View>
            <View>
                <ChevronRight size={24} color={Colors.black} />
            </View>
        </Pressable>
    );
};

const LogoutCard = (props) => {
    return (
        <Pressable
            style={styles.cardContainer}
            onPress={() => {
                props.logout();
            }}
        >
            <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                    <props.icon size={24} color={Colors.white} />
                </View>
                <Text style={styles.labelText}>{props.label}</Text>
            </View>
            <View>
                <ChevronRight size={24} color={Colors.black} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    settingsCardContainer: {
        marginTop: 10,
        gap: 5,
        flex: 1,
    },
    cardContainer: {
        flexDirection: "row",
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    iconContainer: {
        backgroundColor: Colors.primary,
        borderRadius: 70,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    labelText: {
        fontFamily: "medium",
        fontSize: FontSize.regular,
    },
});
