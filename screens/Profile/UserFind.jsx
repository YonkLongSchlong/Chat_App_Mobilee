import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { useFetchFriendRecipent } from "../../hooks/User/useFetchFriendRecipent";
import { useRevocationFriendRequest } from "../../hooks/User/useRevocationFriendRequest";
import { useEffect, useContext,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import FriendRequest from './../Peoples/FriendRequest';

export default function UserFind({ route }) {
  const { user, token } = useContext(AuthContext);
  const {userfind} = route.params;
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [friendRequestStatus, setFriendRequestStatus] = useState(userfind.friendRequest?.status);

  console.log("Trạng thái", userfind.friendRequest?.status);

  useEffect(() => {
    

  }, []);

  const handleSend = async () => {
    try {
      const response = await useFetchFriendRecipent(user, token, userfind.userByPhone._id);
      
      if (response.ok) {
        // Thành công: hiển thị thông báo hoặc cập nhật giao diện người dùng
        setFriendRequestStatus(1);
        console.log("Friend request sent successfully");
      } else {
        // Lỗi: xử lý trường hợp yêu cầu không thành công
        console.log("Failed to send friend request");
      }
    } catch (error) {
      console.error("Error sending friend request:", error.message);
    }
  };


  const handleRevocation = async () => {
    const response = await useRevocationFriendRequest(user, token, userfind.userByPhone._id);
    if (response.status == 200) {
      setFriendRequestStatus(undefined);
      console.log("Friend request revoked successfully");
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.conversationContainer}>
        {/* ---------- AVATAR ---------- */}
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: userfind.userByPhone.avatar }} />
        </View>

        {/* ---------- MESSAGE BOX ---------- */}
        <View style={styles.messageContainer}>
          {/* ---------- USERNAME ---------- */}
          <View>
            <Text style={styles.usernameText}>{userfind.userByPhone.username}</Text>
          </View>

          {/* ---------- BIO ---------- */}
          <View>
            <Text style={styles.bioText} numberOfLines={3}>
              {userfind.userByPhone.bio}
            </Text>
          </View>
        </View>
      </View>

      {/* ---------- BUTTONS ---------- */}
      <View style={styles.btnContainer}>
      {friendRequestStatus === undefined && (
          <Pressable onPress={handleSend}>
            <Text style={styles.btnTextSend}>Send friend request</Text>
          </Pressable>
        )}
        {friendRequestStatus === 1 && (
          <View style={styles.action}>
            <Text style={styles.btnTextSent}>Friend request sent</Text>
            <Pressable onPress={handleRevocation}>
              <Text style={styles.btnRevocation}>Revocation</Text>
            </Pressable>
          </View>
        )}
        {friendRequestStatus === 2 && (
          <Text style={styles.btnTextSent}>Friend request accepted</Text>
        )}
      </View>

        {/* {isFriend ? (
        <Text style={styles.btnTextSent}>This user is your friend</Text>
      ) : ( */}
        {/* <View>
          {!isRequestSent ? (
            <Pressable onPress={handleSend}>
              <Text style={styles.btnTextSend}>Send friend request</Text>
            </Pressable>
          ) : (
            <View style={styles.action}>
              <Text style={styles.btnTextSent}>Friend request sent</Text>
              <Pressable onPress={handleRevocation}>
                <Text style={styles.btnRevocation}>Revocation</Text>
              </Pressable>
            </View>
          )}
        </View> */}
      {/* )} */}

      {/* </View> */}
    </View>
  );
}

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
        // flex: 1,
        borderWidth: 1,
        borderColor: Colors.light_gray,
        borderRadius: 15,
        marginHorizontal: 25,
        marginBottom: 10,
        marginTop:80,
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
      bioText: {
        fontFamily: "regular",
        fontSize: FontSize.small,
        color: Colors.dark_gray,
      },
      btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
      },
      btnTextSend: {
        color: Colors.white,
        backgroundColor: Colors.primary,
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.regular,
      },
      btnTextSent: {
        color: Colors.black,
        backgroundColor: Colors.white,
        borderRadius: 35,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontFamily: "medium",
        fontSize: FontSize.regular,
      },
      btnSend: {
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
      
  btnRevocation: {
    color: Colors.white,
    backgroundColor: Colors.dark_gray,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontFamily: "medium",
    fontSize: FontSize.regular,
    marginRight: 10,
  },
  action: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
});


// import React from "react";
// import { View, Text, Image, StyleSheet, Pressable } from "react-native";
// import Colors from "../../constants/Colors";
// import FontSize from "../../constants/FontSize";
// import { useFetchFriendRecipent } from "../../hooks/User/useFetchFriendRecipent";
// import { useRevocationFriendRequest } from "../../hooks/User/useRevocationFriendRequest";
// import { useEffect, useContext,useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useFindUserByPhone } from './../../hooks/User/useFindUserByPhone';

// export default function UserFind({ route }) {
//   const { user, token } = useContext(AuthContext);
//   const {userfind} = route.params;
//   const [isRequestSent, setIsRequestSent] = useState(false);

//   useEffect(() => {

//   }, []);

//   const handleSend = async () => {
//     try {
//       const response = await useFetchFriendRecipent(user, token, userfind._id);
      
//       if (response.ok) {
//         // Thành công: hiển thị thông báo hoặc cập nhật giao diện người dùng
//         setIsRequestSent(true);
//         console.log("Friend request sent successfully");
//       } else {
//         // Lỗi: xử lý trường hợp yêu cầu không thành công
//         console.log("Failed to send friend request");
//       }
//     } catch (error) {
//       console.error("Error sending friend request:", error.message);
//     }
//   };


//   const handleRevocation = async () => {
//     const response = await useRevocationFriendRequest(user, token, userfind._id);
//     if (response.status == 200) {
//       setIsRequestSent(false);
//     }
//   };

//   return (
//     <View style={styles.cardContainer}>
//       <View style={styles.conversationContainer}>
//         {/* ---------- AVATAR ---------- */}
//         <View style={styles.avatarContainer}>
//           <Image style={styles.avatar} source={{ uri: userfind.userByPhone.avatar }} />
//         </View>

//         {/* ---------- MESSAGE BOX ---------- */}
//         <View style={styles.messageContainer}>
//           {/* ---------- USERNAME ---------- */}
//           <View>
//             <Text style={styles.usernameText}>{userfind.userByPhone.username}</Text>
//           </View>

//           {/* ---------- BIO ---------- */}
//           <View>
//             <Text style={styles.bioText} numberOfLines={3}>
//               {userfind.userByPhone.bio}
//               {/* {userfind.phone} */}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* ---------- BUTTONS ---------- */}
//       <View style={styles.btnContainer}>
//         {/* {isFriend ? (
//         <Text style={styles.btnTextSent}>This user is your friend</Text>
//       ) : ( */}
//         <View>
//           {!isRequestSent ? (
//             <Pressable onPress={handleSend}>
//               <Text style={styles.btnTextSend}>Send friend request</Text>
//             </Pressable>
//           ) : (
//             <View style={styles.action}>
//               <Text style={styles.btnTextSent}>Friend request sent</Text>
//               <Pressable onPress={handleRevocation}>
//                 <Text style={styles.btnRevocation}>Revocation</Text>
//               </Pressable>
//             </View>
//           )}
//         </View>
//       {/* )} */}

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//         height: "100%",
//         width: "100%",
//         backgroundColor: Colors.white,
//       },
//       notFoundText: {
//         fontFamily: "medium",
//         fontSize: FontSize.medium,
//         color: Colors.black,
//       },
//       cardContainer: {
//         // flex: 1,
//         borderWidth: 1,
//         borderColor: Colors.light_gray,
//         borderRadius: 15,
//         marginHorizontal: 25,
//         marginBottom: 10,
//         marginTop:80,
//         paddingVertical: 20,
//         paddingHorizontal: 20,
//         gap: 15,
//         backgroundColor: "white",
//       },
//       conversationContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 20,
//       },
//       avatarContainer: {
//         borderRadius: 70,
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden",
//       },
//       avatar: {
//         height: 70,
//         width: 70,
//         resizeMode: "cover",
//       },
//       messageContainer: {
//         flex: 1,
//         justifyContent: "center",
//       },
//       usernameText: {
//         fontFamily: "medium",
//         fontSize: FontSize.regular,
//         color: Colors.black,
//       },
//       bioText: {
//         fontFamily: "regular",
//         fontSize: FontSize.small,
//         color: Colors.dark_gray,
//       },
//       btnContainer: {
//         flexDirection: "row",
//         justifyContent: "flex-end",
//         gap: 15,
//       },
//       btnTextSend: {
//         color: Colors.white,
//         backgroundColor: Colors.primary,
//         borderRadius: 35,
//         paddingHorizontal: 20,
//         paddingVertical: 8,
//         fontFamily: "medium",
//         fontSize: FontSize.regular,
//       },
//       btnTextSent: {
//         color: Colors.black,
//         backgroundColor: Colors.white,
//         borderRadius: 35,
//         borderWidth: 1,
//         paddingHorizontal: 20,
//         paddingVertical: 8,
//         fontFamily: "medium",
//         fontSize: FontSize.regular,
//       },
//       btnSend: {
//         color: Colors.dark_gray,
//         backgroundColor: Colors.white,
//         borderWidth: 1,
//         borderColor: Colors.light_gray,
//         borderRadius: 35,
//         paddingHorizontal: 20,
//         paddingVertical: 8,
//         fontFamily: "medium",
//         fontSize: FontSize.regular,
//       },
      
//   btnRevocation: {
//     color: Colors.white,
//     backgroundColor: Colors.dark_gray,
//     borderRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     fontFamily: "medium",
//     fontSize: FontSize.regular,
//     marginRight: 10,
//   },
//   action: {
//     flexDirection: "row-reverse",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });
