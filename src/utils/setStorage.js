export const setStorage = (name, data) => {
    if (localStorage.getItem(name)) {
        localStorage.setItem(name, JSON.stringify(data));
        sessionStorage.removeItem(name);
    } else {
        sessionStorage.setItem(name, JSON.stringify(data));
        localStorage.removeItem(name);
    }
};
