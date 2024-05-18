import { ToastAndroid } from "react-native";

export default useSendVideos = async (token, receiverId, formData) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL +
                `/messages/send/video/${receiverId}`,
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
        const data = await response.json();
        if (
            data.error ||
            response.status == 404 ||
            response.status == 400 ||
            response.status === 500
        )
            throw new Error(data, error);
        return data.resultMessage;
    } catch (error) {
        ToastAndroid.show("Please try again", ToastAndroid.LONG);
    }
};
