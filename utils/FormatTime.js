export const formatTime = (time) => {
    const options = {
        day: "2-digit",
        month: "short",
        hour: "numeric",
        minute: "numeric",
    };
    return new Date(time).toLocaleString("en-US", options);
};
