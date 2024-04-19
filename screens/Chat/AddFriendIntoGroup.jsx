import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFetchFriends } from "../../hooks/FriendRequest/useFetchFriends";
import { AuthContext } from "../../context/AuthContext";
import Colors from "../../constants/Colors";
import { Delete } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import useAddFriendGroup from "../../hooks/ChatGroup/useAddFriendGroup";

const AddFriendIntoGroup = ({route}) => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { conversation } = route.params;

  const fetchFriends = async () => {
    const response = await useFetchFriends(user, token);
    const data = await response.json();
    if (response.status === 401) {
      setFriends([]);
    } else {
      setFriends(data);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => handleCheckBoxChange(item._id)}
    >
      <View style={styles.friendInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.friendName}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          {
            backgroundColor: selectedFriends.includes(item._id)
              ? "#007AFF"
              : "transparent",
          },
        ]}
        onPress={() => handleCheckBoxChange(item._id)}
      >
        <View style={styles.checkbox}></View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleCheckBoxChange = (friendId) => {
    const isSelected = selectedFriends.includes(friendId);
    if (isSelected) {
      setSelectedFriends(selectedFriends.filter((_id) => _id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  const addFriendIntoGroup = async () => {
    if (selectedFriends.length > 0) {
      try {
        const promises = selectedFriends.map((friendId) =>
        useAddFriendGroup(token, conversation._id, friendId)
        );
        console.log("cid", conversation._id);
        
        await Promise.all(promises);
        // Xử lý khi thêm bạn bè vào nhóm thành công
        // console.log("fid", friendId);
        console.log( "Add friend into group successfully:");
        navigation.goBack();
      } catch (error) {
        console.log("Error adding friends to group:", error.message);
        setError("Đã xảy ra lỗi khi thêm bạn bè vào nhóm");
      }
    } else {
      setError("Chọn ít nhất một thành viên!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách bạn bè</Text>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        style={styles.friendList}
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.btnAdd} onPress={addFriendIntoGroup}>
        <Text style={styles.textBtnAdd}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 80,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendList: {
    flex: 1,
    width: "100%",
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  btnAdd: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  textBtnAdd: {
    fontSize: 18,
    color: Colors.white,
  },
});

export default AddFriendIntoGroup;
