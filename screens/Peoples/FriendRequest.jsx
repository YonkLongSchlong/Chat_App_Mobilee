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
import { useFetchFriendRequest } from "../../hooks/FriendRequest/FetchFriendRequests";
import { useAcceptFriendRequest } from "../../hooks/FriendRequest/useAcceptFriendRequest";
import { FriendsContext } from "../../context/FriendsContext";

export default function FriendRequest() {
  const { user, token } = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const { friends, setFriends } = useContext(FriendsContext);

  const fetchFriendRequest = async () => {
    const response = await useFetchFriendRequest(user, token);
    const data = await response.json();
    if (response.status === 404) {
      setFriendRequests(null);
    } else {
      setFriendRequests(data);
    }
  };

  useEffect(() => {
    fetchFriendRequest();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {friendRequests != null ? (
          /* Render mỗi mục */
          <View style={{ marginTop: 80 }}>
            <FlatList
              data={friendRequests}
              renderItem={({ item }) => (
                <FriendRequestCard
                  item={item}
                  user={user}
                  token={token}
                  setFriends={setFriends}
                  friends={friends}
                />
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
            <Text style={styles.notFoundText}>No friend requests found</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const FriendRequestCard = ({ item, user, token, setFriends, friends }) => {
  const [accepted, setAccepted] = useState(false);

  // Xử lý sự kiện khi nút Accept được nhấn
  const handleAccept = async (itemId) => {
    const response = await useAcceptFriendRequest(user, token, item.req._id);
    if (response.status == 200) {
      const data = await response.json();
      setFriends([...friends, data[2]]);
      setAccepted(true);
    }
  };

  // Xử lý sự kiện khi nút Decline được nhấn
  const handleDecline = (itemId) => {
    console.log(`Button 2 pressed for item ${itemId}`);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.conversationContainer}>
        {/* ---------- AVATAR ---------- */}
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: item.req.avatar }} />
        </View>

        {/* ---------- MESSAGE BOX ---------- */}
        <View style={styles.messageContainer}>
          {/* ---------- USERNAME ---------- */}
          <View>
            <Text style={styles.usernameText}>{item.req.username}</Text>
          </View>

          {/* ---------- LASTEST MESSAGE ---------- */}
          <View>
            <Text style={styles.messageText} numberOfLines={3}>
              Hello! Can we be friend ?
            </Text>
          </View>
        </View>
      </View>

      {/* ---------- BUTTONS ---------- */}
      <View style={styles.btnContainer}>
        {accepted ? (
          <View>
            <Text style={styles.btnAccepted}>Accepted</Text>
          </View>
        ) : (
          <>
            <Pressable onPress={() => handleAccept(item.id)}>
              <Text style={styles.btnTextAccept}>Accept</Text>
            </Pressable>
            <Pressable onPress={() => handleDecline(item.id)}>
              <Text style={styles.btnTextDecline}>Decline</Text>
            </Pressable>
          </>
        )}
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
  btnTextAccept: {
    color: Colors.white,
    backgroundColor: Colors.primary,
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontFamily: "medium",
    fontSize: FontSize.regular,
  },
  btnTextDecline: {
    color: Colors.white,
    backgroundColor: Colors.dark_gray,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontFamily: "medium",
    fontSize: FontSize.regular,
  },
  btnAccepted: {
    color: Colors.dark_gray,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.light_gray,
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontFamily: "medium",
    fontSize: FontSize.regular,
  },
});
