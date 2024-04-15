import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserHeaderBar from "../../components/HeaderBar/UserHeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import ConversationCard from "../../components/Chat/ConversationCard";
import FontSize from "../../constants/FontSize";
import { ListFilter } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import useFetchConversations from "../../hooks/Conversations/useFetchConversations";
import { AuthContext } from "../../context/AuthContext";
import { useListenConversations } from "../../hooks/ListenSocket/useListenConversations";
import { ConversationsContext } from "../../context/ConversationsContext";
import { useListenAcceptRequest } from "../../hooks/ListenSocket/useListenAcceptRequest";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { conversations, setConversations } = useContext(ConversationsContext);
  const { user, token } = useContext(AuthContext);

  /* LẮNG NGHE SOCKET */
  useListenConversations();
  useListenAcceptRequest();

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      const data = await useFetchConversations(user, token);
      setConversations(data);
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
