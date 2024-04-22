
export function login(userName, password) {
    localStorage.setItem('user', userName);
    localStorage.setItem('password', password);
}

export function logout() {
    localStorage.setItem('user', null);
    localStorage.setItem('password', null);
}

export function getUser() {
    return localStorage.getItem('user');
}

export function getPassword() {
    return localStorage.getItem('password');
}