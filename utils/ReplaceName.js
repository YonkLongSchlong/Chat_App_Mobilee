export const replaceName = (name) => {
    return name
        .normalize("NFC")
        .toLocaleLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[:!@#$%^&*()?;/]/g, "");
};
