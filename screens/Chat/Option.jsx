import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo

const Option = () => {
  const handleAddMember = () => {
    // Xử lý khi nhấn nút Thêm thành viên
  };

  const handleViewMembers = () => {
    // Xử lý khi nhấn nút Xem danh sách thành viên nhóm
  };

  const handleDisbandGroup = () => {
    // Xử lý khi nhấn nút Giải tán nhóm
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
