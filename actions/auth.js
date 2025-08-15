import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';
import Router from 'next/router';

export const handleResponse = response => {
    if (response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: 'Your session is expired. Please signin'
                }
            });
        });
    }
};


export const preSignup = async user => {
    try {
        const response = await fetch(`${API}/pre-signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const signup = async user => {
    try {
        const response = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const signin = async user => {
    try {
        const response = await fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const signout = async () => {
    removeCookie('token');
    removeLocalStorage('user');

    try {
        const response = await fetch(`${API}/signout`, {
            method: 'GET'
        });
        console.log('signout success');
    } catch (err) {
        console.log(err);
    }
};






export const setCookie = (key, value) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = key => {
    if (typeof window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = key => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};

export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const googleauthenticate = (data) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
};

export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const updateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'));
            auth = user;
            localStorage.setItem('user', JSON.stringify(auth));
            next();
        }
    }
};


export const forgotPassword = async email => {
    try {
        const response = await fetch(`${API}/forgot-password`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const resetPassword = async resetInfo => {
    try {
        const response = await fetch(`${API}/reset-password`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resetInfo)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


