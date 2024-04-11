import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { AuthContext } from "../../context/AuthContext";
import { useFetchFriendRequestSent } from '../../hooks/User/useFetchFriendRequestSent';
import { useRevocationFriendRequest } from '../../hooks/User/useRevocationFriendRequest';

export default function FriendRequestSent() {
  const { user, token } = useContext(AuthContext);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const fetchFriendRequestSent = async () => {
    try {
      const response = await useFetchFriendRequestSent(user, token);
      const data = await response.json();
      if (response.status === 404) {
        setFriendRequestsSent(null);
      } else {
        setFriendRequestsSent(data);
      }
    } catch (error) {
      console.error("Fetch friend requests sent failed", error);
    }
  };

  useEffect(() => {
    fetchFriendRequestSent();
  }, 
);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {friendRequestsSent != null ? (
          /* Render mỗi mục */
          <View style={{ marginTop: 80 }}>
            <FlatList
              data={friendRequestsSent}
              renderItem={({ item }) => (
                <FriendRequestSentCard item={item} user={user} token={token} />
              )}
            />
          </View>
        ) : (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.notFoundText}>No friend requests sent found</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const FriendRequestSentCard = ({ item, user, token }) => {

  // Xử lý sự kiện khi nút Revocation được nhấn
  const handleRevocation = async (itemId) => {
    const response = await useRevocationFriendRequest(user, token, item.recei._id);
    if (response.status == 200) {
      setAccepted(true);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.conversationContainer}>
        {/* ---------- AVATAR ---------- */}
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: item.recei.avatar }} /> 
          {/* {require("../../assets/96YOG1ej_200x200.jpg")}  */}
        </View>

        {/* ---------- MESSAGE BOX ---------- */}
        <View style={styles.messageContainer}>
          {/* ---------- USERNAME ---------- */}
          <View>
            <Text style={styles.usernameText}>{item.recei.username}</Text>
          </View>

          {/* ---------- LASTEST MESSAGE ---------- */}
          <View>
            <Text style={styles.messageText} numberOfLines={3}>
            Want to make friends! Can we be friends?
            </Text>
          </View>
        </View>
      </View>

      {/* ---------- BUTTONS ---------- */}
      <View style={styles.btnContainer}>
            
            <Pressable onPress={()=> handleRevocation()} >
            <Text style={styles.btnRevocation}>Revocation
          </Text>

            </Pressable>
          
        {/*  */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.white,
  },
  notFoundText: {
    fontFamily: "medium",
    fontSize: FontSize.medium,
    color: Colors.black,
  },
  cardContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light_gray,
    borderRadius: 15,
    marginHorizontal: 25,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
    backgroundColor: "white",
  },
  conversationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  avatarContainer: {
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatar: {
    height: 70,
    width: 70,
    resizeMode: "cover",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  usernameText: {
    fontFamily: "medium",
    fontSize: FontSize.regular,
    color: Colors.black,
  },
  messageText: {
    fontFamily: "regular",
    fontSize: FontSize.small,
    color: Colors.dark_gray,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  btnRevocation: {
    color: Colors.white,
    backgroundColor: Colors.dark_gray,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontFamily: "medium",
    fontSize: FontSize.regular,
  },
});
