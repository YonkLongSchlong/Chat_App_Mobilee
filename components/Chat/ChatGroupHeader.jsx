import { Ionicons } from "@expo/vector-icons"; // Import thư viện icon
import { useNavigation } from "@react-navigation/native";
import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

export const ChatGroupHeader = ({ conversation }) => {
    const navigative = useNavigation();
    const handlePressOption = () => {
        navigative.navigate("Option", { conversation });
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
            }}
        >
            {conversation && (
                <View style={styles.container}>
                    {/* ---------- CONVERSATION NAME CONTAINER ---------- */}
                    <View style={styles.headerView}>
                        <Pressable
                            style={styles.backBtnContainer}
                            onPress={() => navigative.popToTop()}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color={Colors.black}
                            />
                        </Pressable>
                        <View style={styles.avartaContainer}>
                            <Image
                                style={{
                                    height: 45,
                                    width: 45,
                                    resizeMode: "cover",
                                }}
                                source={{
                                    uri: `${conversation.conversationImage}`,
                                }}
                            />
                        </View>
                        <Text style={styles.headerText}>
                            {conversation.name}
                        </Text>
                    </View>

                    {/* ---------- ICON CONTAINER ---------- */}
                    <View style={styles.iconContainer}>
                        <Pressable>
                            <Ionicons
                                name="videocam-outline"
                                size={22}
                                color={Colors.primary}
                            />
                        </Pressable>
                        <Pressable onPress={handlePressOption}>
                            <Ionicons
                                name="grid-outline"
                                size={22}
                                color={Colors.primary}
                            />
                        </Pressable>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

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
