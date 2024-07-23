import { ToastAndroid } from "react-native";

export default useFetchMessages = async (token, userToChatId) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + `/messages/${userToChatId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (data.error || response.status === 400 || response.status === 404)
            throw new Error(data);
        return data;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
