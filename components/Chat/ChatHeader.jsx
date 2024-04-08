import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Import thư viện icon

export default function ChatHeader({ onCall, onVideoCall }) {
  return (
    <View style={styles.header}>
        <View style={styles.headerView}>
            <Text style={styles.headerText}>Tên đối phương</Text>
        </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onCall}>
          <Ionicons name="call" size={24} color="blue" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onVideoCall}>
          <Ionicons name="videocam" size={24} color="blue" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerView :{
    // marginRight: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginLeft: 100,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
});
