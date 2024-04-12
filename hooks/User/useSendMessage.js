import { ToastAndroid } from "react-native";

export default useSendMessages = async (
  token,
  receiverId,
  message,
  conversationName
) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + `/messages/send/${receiverId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          message,
          conversationName,
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
