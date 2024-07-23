import { ToastAndroid } from "react-native";

export default useSendFiles = async (token, receiverId, formData) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL +
                `/messages/send/file/${receiverId}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: formData,
            }
        );
        if (!response.ok) throw new Error("Please try again", error);
        return response;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        return null;
    }
};
