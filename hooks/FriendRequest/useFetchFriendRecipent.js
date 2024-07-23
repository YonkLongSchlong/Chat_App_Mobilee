export const useFetchFriendRecipent = async (user, token, recipentId) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL +
        `/friends/${user._id}/${recipentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log({ Error: "Send friend invitations failed", msg: error.message });
  }
};