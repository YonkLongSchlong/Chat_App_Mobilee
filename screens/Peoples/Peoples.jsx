import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import PeopleHeaderBar from "../../components/HeaderBar/PeopleHeaderBar";
import FontSize from "../../constants/FontSize";
import { Gift, UserPlus, Users } from "lucide-react-native";
import Friend from "../../components/People/Friend";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { useFetchFriends } from "../../hooks/User/useFetchFriends";

export default function Peoples() {
  const [selected, setSelected] = useState("Friends");
  const [friendsSelected, setFriendsSelected] = useState("All");
  const { user, token } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const response = await useFetchFriends(user, token);
    const data = await response.json();
    if (response.status === 401) {
      setFriends(null);
    } else {
      setFriends(data);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <>
      <LinearGradient colors={Colors.gradient}>
        <SafeAreaView>
          <PeopleHeaderBar />
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.headerContainer}>
          <ScrollView horizontal style={styles.scrollContainer}>
            <CategoryButton
              text={"Friends"}
              selected={selected}
              setSelected={setSelected}
            />
            <CategoryButton
              text={"Groups"}
              selected={selected}
              setSelected={setSelected}
            />
          </ScrollView>
        </View>

        {/* ---------- SEPARATOR ---------- */}
        <View
          style={{
            height: 1,
            width: StyleSheet.hairlineWidth,
            backgroundColor: Colors.light_gray,
          }}
        ></View>

        {/* ---------- FRIENDS REQUEST, BIRTHDAY, CONTACTS ---------- */}
        <View style={styles.optionContainer}>
          <OptionsCard
            label="FriendRequest"
            text={"Friend requests"}
            component={UserPlus}
          />
          <OptionsCard label="Contact" text={"Contact"} component={Users} />
          <OptionsCard label="Birthday" text={"Birthday"} component={Gift} />
        </View>

        {/* ---------- SEPARATOR ---------- */}
        <View
          style={{
            height: 1,
            width: StyleSheet.hairlineWidth,
            backgroundColor: Colors.light_gray,
          }}
        ></View>

        {/* ---------- ALL FRIENDS & ONLINE FRIENDS HEADER ---------- */}
        <View style={styles.friendsHeaderContainer}>
          <FriendsOptionButton
            text={"All"}
            setFriendsSelected={setFriendsSelected}
            friendsSelected={friendsSelected}
          />
          <FriendsOptionButton
            text={"Online"}
            setFriendsSelected={setFriendsSelected}
            friendsSelected={friendsSelected}
          />
        </View>

        {/* ---------- SEPARATOR ---------- */}
        <View
          style={{
            height: 1,
            width: StyleSheet.hairlineWidth,
            backgroundColor: Colors.light_gray,
          }}
        ></View>

        {/* ---------- FRIEND LIST ---------- */}
        <View style={styles.scrollView}>
          <FlashList
            data={friends}
            estimatedItemSize={50}
            renderItem={({ item }) => {
              return <Friend friend={item} />;
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

function CategoryButton(props) {
  return (
    <Pressable
      onPress={() => props.setSelected(props.text)}
      style={{
        marginHorizontal: 10,
        borderRadius: 25,
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor:
          props.selected == props.text ? Colors.primary : "white",
      }}
    >
      <Text
        style={[
          styles.headerText,
          { color: props.selected == props.text ? "white" : Colors.black },
        ]}
      >
        {props.text}
      </Text>
    </Pressable>
  );
}

const FriendsOptionButton = (props) => {
  return (
    <Pressable
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 90,
      }}
      onPress={() => props.setFriendsSelected(props.text)}
    >
      <Text
        style={{
          fontFamily: "medium",
          fontSize: FontSize.regular,
          textAlign: "center",
        }}
      >
        {props.text}
      </Text>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 10,
          height: 3,
          width: "100%",
          backgroundColor:
            props.friendsSelected == props.text ? "black" : "white",
        }}
      ></View>
    </Pressable>
  );
};

const OptionsCard = (props) => {
  const navigation = useNavigation();
  const handleNavigation = (props) => {
    navigation.navigate(props.label);
  };
  return (
    <Pressable
      style={{
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        padding: 15,
        paddingHorizontal: 25,
      }}
      onPress={() => {
        handleNavigation(props);
      }}
    >
      <props.component size={24} color={"black"} />
      <Text style={{ fontFamily: "medium", fontSize: FontSize.regular }}>
        {props.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 15,
    marginHorizontal: 10,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontFamily: "semiBold",
    fontSize: FontSize.medium,
  },
  optionContainer: {
    // backgroundColor: "red",
    backgroundColor: "white",
  },
  friendsHeaderContainer: {
    height: 70,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
    height: "100%",
  },
});
