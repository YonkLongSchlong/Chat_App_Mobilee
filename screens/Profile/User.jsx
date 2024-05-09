import {
    View,
    Text,
    Animated,
    Image,
    StyleSheet,
    Dimensions,
    Pressable,
    FlatList,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import {
    Archive,
    History,
    ImagePlusIcon,
    Settings,
    Video,
} from "lucide-react-native";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/AuthContext";

const BANNER_MAX_HEIGHT = Dimensions.get("window").height / 2.5;
const settingOptions = [
    {
        id: 1,
        name: "Settings",
        icon: <Settings size={24} color={Colors.primary} />,
    },
    {
        id: 2,
        name: "My avatar",
        icon: <ImagePlusIcon size={24} color={Colors.primary} />,
    },
    {
        id: 3,
        name: "Stories archive",
        icon: <Archive size={24} color={Colors.primary} />,
    },
    {
        id: 4,
        name: "Memories",
        icon: <History size={24} color={Colors.primary} />,
    },
    {
        id: 5,
        name: "My videos",
        icon: <Video size={24} color={Colors.primary} />,
    },
];

export default function User({ navigation }) {
    const { user } = useContext(AuthContext);
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleNavigation = (item) => {
        if (item.name == "Settings") {
            navigation.navigate("Settings");
        }
        if (item.name == "My avatar") {
            navigation.navigate("AvatarSetting");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {/* ---------- IMAGE BANNER ---------- */}
                <View style={styles.bannerContainer}>
                    <Animated.Image
                        style={styles.banner(scrollY)}
                        source={require("../../assets/gradient-2.jpg")}
                    />
                </View>

                {/* ---------- AVARTA BANNER ---------- */}
                <View style={styles.avartarContainer}>
                    <Image
                        style={styles.avarta}
                        source={{ uri: user.avatar }}
                    />
                </View>

                {/* ---------- USERNAME AND BIO ---------- */}
                <View style={{ marginTop: 80, alignItems: "center" }}>
                    <Text style={styles.userNameText}>{user.username}</Text>
                    <Text style={styles.bioText}>{user.bio}</Text>
                </View>

                {/* ---------- SETTING OPTIONS ---------- */}
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 30,
                    }}
                >
                    <View style={styles.optionListContainer}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={settingOptions}
                            estimatedItemSize={10}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <Pressable
                                            style={styles.settingOptionButton}
                                            onPress={() =>
                                                handleNavigation(item)
                                            }
                                        >
                                            {item.icon}
                                            <Text
                                                style={styles.settingOptionText}
                                            >
                                                {item.name}
                                            </Text>
                                        </Pressable>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>

                {/* ---------- TODO: FEED ?? ---------- */}
                <View style={{ height: 500 }}></View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    bannerContainer: {
        alignItems: "center",
        overflow: "hidden",
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    banner: (scrollY) => ({
        height: BANNER_MAX_HEIGHT,
        width: "300%",
        resizeMode: "cover",
        transform: [
            {
                translateY: scrollY.interpolate({
                    inputRange: [
                        -BANNER_MAX_HEIGHT,
                        0,
                        BANNER_MAX_HEIGHT,
                        BANNER_MAX_HEIGHT + 1,
                    ],
                    outputRange: [
                        -BANNER_MAX_HEIGHT / 2,
                        0,
                        BANNER_MAX_HEIGHT * 0.75,
                        BANNER_MAX_HEIGHT * 0.75,
                    ],
                }),
            },
            {
                scale: scrollY.interpolate({
                    inputRange: [
                        -BANNER_MAX_HEIGHT,
                        0,
                        BANNER_MAX_HEIGHT,
                        BANNER_MAX_HEIGHT + 1,
                    ],
                    outputRange: [2, 1, 0.5, 0.5],
                }),
            },
        ],
    }),
    avartarContainer: {
        width: 150,
        height: 150,
        backgroundColor: "white",
        borderRadius: 75,
        borderWidth: 5,
        borderColor: "#ECECED",
        alignItems: "center",
        position: "absolute",
        left: Dimensions.get("window").width / 2 - 75,
        top: Dimensions.get("window").height / 2.5 - 75,
    },
    avarta: {
        width: 140,
        height: 140,
        borderRadius: 75,
        resizeMode: "contain",
        borderWidth: 0,
    },
    userNameText: { fontFamily: "semiBold", fontSize: FontSize.ex_lagre },
    bioText: {
        marginTop: 5,
        fontFamily: "regular",
        fontSize: FontSize.small,
        color: Colors.dark_gray,
        width: 250,
        textAlign: "center",
    },
    optionListContainer: {
        alignItems: "center",
        width: "90%",
    },
    settingOptionButton: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginRight: 10,
        borderRadius: 15,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    settingOptionText: {
        fontFamily: "regular",
        fontSize: FontSize.small,
    },
    changeAvartaIcon: {
        position: "absolute",
        bottom: 10,
        right: -5,
        zIndex: 100,
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 75,
    },
});
