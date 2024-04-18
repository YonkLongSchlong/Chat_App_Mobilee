import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
} from "react-native";
import { useFetchFriends } from "../../hooks/FriendRequest/useFetchFriends";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { Delete } from "lucide-react-native";
import { useFetchCreateGroup } from "../../hooks/ChatGroup/useFetchCreateGroup";

const SelectChatGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const fetchFriends = async () => {
    const response = await useFetchFriends(user, token); // Sử dụng user và token từ đâu đó
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

  const handleInputChange = (text) => {
    setGroupName(text);
  };

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

  const selectedFriendItems = selectedFriends.map((friendId) => {
    const friend = friends.find((item) => item._id === friendId); // Tìm kiếm thông tin của bạn bè dựa trên id
    return (
      <View style={styles.selectedFriendItem} key={friend._id}>
        <Image source={{ uri: friend.avatar }} style={styles.avatar} />
        <TouchableOpacity onPress={() => removeSelectedFriend(friend._id)}>
          <Delete size={24} color={"black"} />
        </TouchableOpacity>
      </View>
    );
  });

  const removeSelectedFriend = (friendId) => {
    setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
  };

  // const createGroup = () => {
  //     if (selectedFriends.length > 1 && groupName.trim() !== '') {
  //         navigation.navigate('ChatGroup', {
  //             groupName: groupName,
  //             selectedFriends: selectedFriends
  //         });
  //     } else
  //         if( groupName.trim() == '') {
  //             console.log("Chưa nhập tên nhóm!")
  //             setError("Chưa nhập tên nhóm!");
  //         } else {
  //             console.log("Chọn ít nhất 2 thành viên!")
  //             setError("Chọn ít nhất 2 thành viên!");
  //         }
  // };

  const createGroup = async () => {
    if (selectedFriends.length > 1 && groupName.trim() !== "") {
      try {
        console.log("Id", selectedFriends);
        const response = await useFetchCreateGroup(
          user,
          token,
          selectedFriends,
          groupName
        );
        console.log(response.json);
        const responseData = await response.json();
        const newConversationId = responseData.conversationId; // lưu conversationId vào state
        // Xử lý phản hồi từ máy chủ nếu cần
        navigation.navigate("ChatGroup", {
          groupName: groupName,
          selectedFriends: selectedFriends,
          conversationId: newConversationId,
        });
      } catch (error) {
        console.log("Error creating group:", error.message);
      }
    } else if (groupName.trim() === "") {
      setError("Chưa nhập tên nhóm!");
    } else {
      setError("Chọn ít nhất 2 thành viên!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách bạn bè</Text>
      <TextInput
        style={styles.input}
        placeholder="Đặt tên nhóm"
        value={groupName}
        onChangeText={handleInputChange}
      />
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        style={styles.friendList}
      />
      <Text style={styles.selectedHeading}>Bạn bè đã chọn:</Text>
      <View style={styles.selectedFriendList}>{selectedFriendItems}</View>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.btnNext} onPress={createGroup}>
        <Text style={styles.textBtnNext}>Chuyển tiếp</Text>
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
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  selectedHeading: {
    fontSize: 18,
    marginBottom: 5,
  },
  selectedFriendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedFriendName: {
    fontSize: 16,
  },
  selectedFriendList: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  delete: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
  btnNext: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  textBtnNext: {
    fontSize: 18,
    color: Colors.white,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default SelectChatGroup;
