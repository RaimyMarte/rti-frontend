import Cookies from "js-cookie";

export const getHeaders = () => ({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${Cookies.get('token')}`
});

export const getHeadersWithoutContentType = () => ({
    'Authorization': `Bearer ${Cookies.get('token')}`
});