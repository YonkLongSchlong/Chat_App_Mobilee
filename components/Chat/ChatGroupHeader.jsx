import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import thư viện icon
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export const ChatGroupHeader = ({ conversation }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: 70,
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        {/* ---------- CONVERSATION NAME CONTAINER ---------- */}
        <View style={styles.headerView}>
          <Pressable
            style={styles.backBtnContainer}
            onPress={() => navigation.popToTop()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </Pressable>
          <View style={styles.avartaContainer}>
            <Image
              style={{ height: 45, width: 45, resizeMode: "cover" }}
              source={{ uri: `${conversation.conversationImage}` }}
            />
          </View>
          <Text style={styles.headerText}>{conversation.name}</Text>
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
          <Pressable>
            <Ionicons name="grid-outline" size={22} color={Colors.primary} />
          </Pressable>
        </View>
      </View>
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
