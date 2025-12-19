import { writable } from 'svelte/store';


export const isLoggedIn = writable(false);
export const isModerator = writable(false);
export const isAdmin = writable(false);


export const user = writable({
    User_ID: null,
    Username: '',
    Email: '',
    role: 'user'
});

export function setUser(userData) {
    user.set({
        User_ID: userData.User_ID,
        Username: userData.Username,
        Email: userData.Email,
        role: userData.isAdmin ? 'admin' : (userData.isModerator ? 'moderator' : 'user')
    });

    isLoggedIn.set(true);
    isModerator.set(userData.isModerator === 1 || userData.isAdmin === 1);
    isAdmin.set(userData.isAdmin === 1);
}

export function clearUser() {
    user.set({ User_ID: null, Username: '', Email: '', role: 'user' });
    isLoggedIn.set(false);
    isModerator.set(false);
    isAdmin.set(false);
}