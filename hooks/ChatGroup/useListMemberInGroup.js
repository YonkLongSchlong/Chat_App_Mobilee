export const useListMembersInGroup = async (token, conversationId) => {
    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL + `/group/get/${conversationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch members in group");
      }
  
      const data = await response.json();
      // console.log("Data from useListMembersInGroup:", data);
      return data;
    } catch (error) {
      console.log({ Error: "Failed fetching members in group", msg: error.message });
      throw error;
    }
  };
  