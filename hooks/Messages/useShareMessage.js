import { ToastAndroid } from "react-native";

export default useShareMessages = async (token, receiverId, messageId) => {
  console.log(receiverId, messageId);
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + `/messages/share/${receiverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messageId,
        }),
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data, error);
    return data;
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
};
