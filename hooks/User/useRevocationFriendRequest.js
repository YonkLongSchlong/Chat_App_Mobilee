export const useRevocationFriendRequest = async (user, token, recipentId) => {
    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL +
          `/friends/${user._id}/${recipentId}/cancel`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log({ Error: "Revocation friend request failed", msg: error.message });
    }
  };  