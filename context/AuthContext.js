import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async ({ phone, password }) => {
        try {
            /* Fetch user bằng phone, pwd */
            const response = await fetch(
                process.env.EXPO_PUBLIC_BASE_URL + "/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        phone: phone,
                        password: password,
                    }),
                }
            );
            const data = await response.json();

            /* Nếu response trả về 200 (thành công) 
         Lưu user, token lại trong localstore đt và trong state */
            if (response.status === 200) {
                setToken(data.token);
                setUser(data.user);
                await SecureStore.setItemAsync("Token", data.token);
                await SecureStore.setItemAsync(
                    "User",
                    JSON.stringify(data.user)
                );
            } else {
                Alert.alert(
                    "Login Failed",
                    "Something went wrong. Please try again"
                );
            }
        } catch (error) {
            console.log({ Error: error.message });
        }
    };

    /*Xóa access token và thông tin user trong local storage của điện thoại */
    const logout = async () => {
        await SecureStore.deleteItemAsync("Token");
        await SecureStore.deleteItemAsync("User");
        setToken(null);
        setUser(null);
    };

    /* Lấy access token và thông tin user mỗi lần user mở lại app */
    const isLoggedin = async () => {
        try {
            const token = await SecureStore.getItemAsync("Token");
            const response = await fetch(
                process.env.EXPO_PUBLIC_BASE_URL + "/auth/find",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updateUser = await response.json();
            setUser(updateUser);
            setToken(token);
        } catch (error) {
            console.log({ Error: error.message });
        }
    };

    useEffect(() => {
        isLoggedin();
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
