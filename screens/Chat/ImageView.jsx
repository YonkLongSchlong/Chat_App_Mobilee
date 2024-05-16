import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import React from "react";
import { Image, Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";

export const ImageView = ({ route, navigation }) => {
    const { item } = route.params;

    const downLoadImage = async () => {
        const fileName = item.message;
        const result = await FileSystem.downloadAsync(
            item.messageUrl,
            FileSystem.documentDirectory + fileName
        );
        await saveToPhone(result.uri, fileName, result.headers["Content-Type"]);
    };

    const saveToPhone = async (uri, filename, mimetype) => {
        if (Platform.OS === "android") {
            const permissions =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    filename,
                    mimetype
                )
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, {
                            encoding: FileSystem.EncodingType.Base64,
                        });
                    })
                    .then(() => {
                        ToastAndroid.show(
                            "Download complete",
                            ToastAndroid.SHORT
                        );
                    })
                    .catch((error) =>
                        ToastAndroid.show(error.message, ToastAndroid.SHORT)
                    );
            } else {
                Sharing.shareAsync(uri);
            }
        } else {
            Sharing.shareAsync(uri);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#E2E9F1" }}>
            <View style={styles.container}>
                <View style={styles.utilityContainer}>
                    <View style={styles.iconContainer}>
                        <Pressable
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Ionicons
                                name="close"
                                size={24}
                                color={Colors.primary}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                downLoadImage();
                            }}
                        >
                            <Ionicons
                                name="download"
                                size={24}
                                color={Colors.primary}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: `${item.messageUrl}` }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    utilityContainer: {
        marginVertical: 15,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        aspectRatio: 1 / 2,
        backgroundColor: Colors.white,
    },

    image: {
        flex: 1,
        width: "100%",
        resizeMode: "contain",
    },
});
