import { ToastAndroid } from "react-native";

export default useSendMessages = async (token, receiverId, message) => {
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
                }),
            }
        );
        const data = await response.json();
        if (data.error || response.status === 404 || response.status === 400)
            throw new Error(data);
        return data;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
