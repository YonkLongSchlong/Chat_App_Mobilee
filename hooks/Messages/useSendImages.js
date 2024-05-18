import { ToastAndroid } from "react-native";

export default useSendImages = async (token, receiverId, formData) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL +
                `/messages/send/image/${receiverId}`,
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
        ) {
            throw new Error(data);
        }
        return data.resultMessage;
    } catch (error) {
        ToastAndroid.show("Please try again", ToastAndroid.LONG);
    }
};
