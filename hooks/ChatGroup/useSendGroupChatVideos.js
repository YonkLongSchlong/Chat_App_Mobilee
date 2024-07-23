import { ToastAndroid } from "react-native";

export const useSendGroupChatVideos = async (token, formData) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + "/group/messages/send/videos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );
        if (!response.ok) {
            throw new Error("Please try again");
        }
        return response;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        return null;
    }
};
