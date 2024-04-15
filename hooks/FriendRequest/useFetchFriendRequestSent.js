export const useFetchFriendRequestSent = async (user, token) => {
    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL +
          `/friends/${user._id}/requests/sented`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
      const data = await response.json();
        console.log("Response data:", data); // In dữ liệu ra console log
        return data;
    } catch (error) {
      console.log({ Error: "Fetch friend request sent failed", msg: error.message });
    }
  };
  