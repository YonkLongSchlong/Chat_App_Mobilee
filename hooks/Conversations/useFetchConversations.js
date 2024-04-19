import { ToastAndroid } from "react-native";

export default useFetchConversations = async (user, token) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + `/messages/conversations/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.error) throw new Error(data, error);
    return data;
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
};
