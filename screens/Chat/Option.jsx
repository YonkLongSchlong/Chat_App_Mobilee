import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useCloseGroupChat } from "../../hooks/ChatGroup/useCloseGroupChat"; 
import { useNavigation } from "@react-navigation/native";

const Option = ({ route }) => {
  const navigation = useNavigation(); 

  const { conversation } = route.params;
  
  const { user, token } = useContext(AuthContext);

  const handleAddMember = () => {
    navigation.navigate("AddFriendIntoGroup", { conversation })
  };

  const handleViewMembers = () => {
    navigation.navigate("ListMembers", { conversation });
  };

  
  const handleDisbandGroup = async () => {
    // try {
      const result = await useCloseGroupChat(token, conversation._id); 
      console.log("Group disbanded successfully:", result);
  };

  return (
    <View style={styles.container}>
      {/* Button "Thêm thành viên" */}
      <Pressable style={styles.button} onPress={handleAddMember}>
        <Ionicons
          name="person-add"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Thêm thành viên</Text>
      </Pressable>

      {/* Button "Xem danh sách thành viên nhóm" */}
      <Pressable style={styles.button} onPress={handleViewMembers}>
        <Ionicons name="people" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Xem danh sách thành viên nhóm</Text>
      </Pressable>

      {/* Button "Giải tán nhóm" */}
      <Pressable style={styles.button} onPress={handleDisbandGroup}>
        <Ionicons name="exit" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Giải tán nhóm</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row", // Chia layout theo hàng ngang
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center", // Canh chỉnh văn bản và icon theo chiều dọc
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10, // Khoảng cách giữa icon và văn bản
  },
  icon: {
    marginRight: 10, // Khoảng cách giữa icon và văn bản
  },
});

export default Option;
