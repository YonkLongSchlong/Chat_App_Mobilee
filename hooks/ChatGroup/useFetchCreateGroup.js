export const useFetchCreateGroup = async () => {
  const participantsId = [
    "66122dc72c39a20527c1cd5a",
    "66122de62c39a20527c1cd61",
  ];
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + "/group/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        participantsId,
        conversationName: "Test",
      }),
    }
  );
  const data = await response.json();
  console.log(data);
};
