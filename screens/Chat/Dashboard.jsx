import { LinearGradient } from "expo-linear-gradient";
import { ListFilter } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ConversationCard from "../../components/Chat/ConversationCard";
import UserHeaderBar from "../../components/HeaderBar/UserHeaderBar";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { ConversationsContext } from "../../context/ConversationsContext";
import { useFetchConversations } from "../../hooks/Conversations";
import {
    useListenAcceptRequest,
    useListenConversations,
} from "../../hooks/ListenSocket";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const { conversations, setConversations } =
        useContext(ConversationsContext);
    // const [filteredList, setFilteredList] = useState([]);
    const { user, token } = useContext(AuthContext);

    // const handleSearch = (text) => {
    //     if (text === "") {
    //         setFilteredList(conversations);
    //         return;
    //     }

    //     const searchList = conversations.filter((conversation) => {
    //         if (!conversation.name) {
    //             if (conversation.participants[0]._id !== user._id)
    //                 return replaceName(conversation.participants[0].username)
    //                     .toLowerCase()
    //                     .includes(text.toLowerCase());
    //             if (conversation.participants[1]._id !== user._id)
    //                 return replaceName(conversation.participants[1].username)
    //                     .toLowerCase()
    //                     .includes(text.toLowerCase());
    //         } else {
    //             return replaceName(conversation.name)
    //                 .toLowerCase()
    //                 .includes(text.toLowerCase());
    //         }
    //     });
    //     setFilteredList(searchList);
    // };

    /* LẮNG NGHE SOCKET */
    useListenConversations();
    useListenAcceptRequest();

    console.log("Render dashboard");

    useEffect(() => {
        const getConversations = async () => {
            setIsLoading(true);
            const data = await useFetchConversations(token);
            setConversations(data);
            // setFilteredList(data);
            setIsLoading(false);
        };

        getConversations();
    }, []);

    return (
        <View style={styles.container}>
            {/* ---------- SEARCH BAR ---------- */}
            <LinearGradient colors={Colors.gradient}>
                <SafeAreaView>
                    <UserHeaderBar />
                </SafeAreaView>
            </LinearGradient>

            {/* ---------- HEADER ---------- */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Messages</Text>
                <ListFilter size={24} color={Colors.black} />
            </View>

            {/* ---------- SEPARATOR ---------- */}
            <View
                style={{
                    height: 1,
                    width: StyleSheet.hairlineWidth,
                    backgroundColor: "white",
                }}
            ></View>

            {/* ---------- CHAT SECTION ----------*/}
            <View style={styles.conversationsContainer}>
                {!isLoading ? (
                    <ScrollView>
                        {conversations &&
                            conversations.map((conversation) => {
                                return (
                                    <ConversationCard
                                        key={conversation._id}
                                        convers={conversation}
                                    />
                                );
                            })}
                    </ScrollView>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerText: {
        fontFamily: "semiBold",
        fontSize: FontSize.large,
    },
    conversationsContainer: {
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    onlineContainer: {
        height: 100,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    avartaImage: {
        width: 65,
        height: 65,
        resizeMode: "center",
        borderRadius: 70,
    },
});
