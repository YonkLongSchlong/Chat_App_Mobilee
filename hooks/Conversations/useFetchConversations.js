import { ToastAndroid } from "react-native";

export default useFetchConversations = async (token) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + `/messages/conversations/get`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (data.error) throw new Error(data, error);
        return data;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
