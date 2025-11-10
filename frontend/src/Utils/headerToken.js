export const getAuthHeaders = () => {
    const tokenData = sessionStorage.getItem("userData") || localStorage.getItem("userData");
    if (tokenData) {
        // const token = JSON.parse(tokenData).token.split['.'].slice[1]; // ensure this is the JWT string
        return { Authorization: `Bearer ${tokenData}` };
    }
    return {};
};


export const getIsLoggedIn = () => {
    return sessionStorage.getItem("userData") || localStorage.getItem("userData");

};