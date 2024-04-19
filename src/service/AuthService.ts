import axios from 'axios';
import Cookies from 'universal-cookie';
import { CustomError } from '../components/login/ErrorComponent';

const cookie = new Cookies();

function getCookie(name: string): any {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }

    return null; // Cookie not found
}


const fetchToken = async (name: string, pass: string): Promise<string> => {
    return axios.post<any>('http://localhost:8080/login', {
        "username": name, "password": pass
    })
        .then(response => {
            console.log(response)
            cookie.set("_invalid_access_", response.data.access_token, { path: '/', maxAge: 300 })
            return response.data.access_token;
        })
        .catch(() => {
            throw new CustomError('Wrong Username or Password', 401);
        });
}


const getToken = () => {
    if (getCookie("_invalid_access_")) {
        return getCookie("_invalid_access_");
    }
    return false;
}

export { getToken, fetchToken };