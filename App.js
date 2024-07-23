import { useFonts } from "expo-font";
import { View } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import NavigationWrapper from "./screens/Navigations/NavigationWrapper";

export default function App() {
    const [fontLoaded] = useFonts({
        fontTitle: require("./assets/fonts/Pacifico-Regular.ttf"),
        regular: require("./assets/fonts/Lexend-Regular.ttf"),
        medium: require("./assets/fonts/Lexend-Medium.ttf"),
        semiBold: require("./assets/fonts/Lexend-SemiBold.ttf"),
        bold: require("./assets/fonts/Lexend-Bold.ttf"),
        extraBold: require("./assets/fonts/Lexend-ExtraBold.ttf"),
    });

    if (!fontLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <AuthProvider>
            <NavigationWrapper />
        </AuthProvider>
    );
}
