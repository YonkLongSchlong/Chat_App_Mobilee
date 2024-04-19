export const useFetchCreateGroup = async (
  user,
  token,
  participantsId,
  conversationName
) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + `/group/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participantsId: participantsId,
          conversationName: conversationName,
        }),
      }
    );
    const data = await response.json();
    console.log("Data", data);
    return response;
  } catch (error) {
    console.log({ Error: "Create group fail", msg: error.message });
  }
};
