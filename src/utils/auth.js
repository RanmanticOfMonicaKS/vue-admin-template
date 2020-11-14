import Cookies from 'js-cookie'

const TokenKey = 'uuid'

export function getToken() {
    return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
    return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return window.localStorage.removeItem(TokenKey)
}

export function setName(name) {
    return window.localStorage.setItem('name', name);
}

export function getName(name) {
    return window.localStorage.getItem('name');
}

export function removeName(name) {
    return window.localStorage.removeItem('name');
}