import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async ({ phone, password }) => {
    try {
      setIsLoading(true);

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
        await SecureStore.setItemAsync("User", JSON.stringify(data.user));
        setIsLoading(false);
      } else {
        Alert.alert("Login Failed", "Something went wrong. Please try again");
        setIsLoading(false);
      }
    } catch (error) {
      console.log({ Error: error.message });
      setIsLoading(false);
    }
  };

  /*Xóa access token và thông tin user trong local storage của điện thoại */
  const logout = async () => {
    setIsLoading(true);
    await SecureStore.deleteItemAsync("Token");
    await SecureStore.deleteItemAsync("User");
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  /* Lấy access token và thông tin user mỗi lần user mở lại app */
  const isLoggedin = async () => {
    try {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync("Token");
      const user = await SecureStore.getItemAsync("User");
      setUser(JSON.parse(user));
      setToken(token);
      setIsLoading(false);
    } catch (error) {
      console.log({ Eroor: error.message });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, token, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
