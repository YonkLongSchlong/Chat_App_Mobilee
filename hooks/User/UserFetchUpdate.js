import { ToastAndroid } from "react-native";

export default userFetchUpdate = async (type, user, token, data) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + `/user/${user._id}/${type}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (response.status !== 200) throw new Error(response.msg);
    return response;
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
};
