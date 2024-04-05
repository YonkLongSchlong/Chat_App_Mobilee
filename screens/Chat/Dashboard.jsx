import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UserHeaderBar from "../../components/HeaderBar/UserHeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { FlashList } from "@shopify/flash-list";
import ConversationCard from "../../components/Chat/ConversationCard";
import FontSize from "../../constants/FontSize";
import { ListFilter } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export default function Dashboard() {
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

      {/* ---------- CHAT SECTION ---------- */}
      <View style={styles.conversationsContainer}>
        <FlashList
          data={data}
          estimatedItemSize={100}
          renderItem={({ item }) => {
            return <ConversationCard />;
          }}
        />
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
