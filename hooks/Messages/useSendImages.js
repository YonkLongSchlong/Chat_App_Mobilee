import { ToastAndroid } from "react-native";

export default useSendImages = async (token, receiverId, formData) => {
    try {
        console.log(formData._parts);
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL +
                `/messages/send/image/${receiverId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Please try again");
        }
        return response;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        return null;
    }
};
