export const setData = data => {
    if (localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify(data));
        sessionStorage.removeItem('data');
    } else {
        sessionStorage.setItem('data', JSON.stringify(data));
        localStorage.removeItem('data');
    }
};
