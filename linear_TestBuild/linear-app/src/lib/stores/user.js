import { writable } from 'svelte/store';


export const isLoggedIn = writable(false);
export const isModerator = writable(false);
export const isAdmin = writable(false);


export const user = writable({
    User_ID: null,
    Username: '',
    Email: '',
    userAvatar: '',
    role: 'user'
});

export function setUser(userData) {
    // FIX: Target the 'user' store, not the 'userData' argument
    user.set({
        User_ID: userData.User_ID,
        Username: userData.Username,
        Email: userData.Email,
        userAvatar: userData.userAvatar || '',
        role: userData.role || 'user'
    });

    isLoggedIn.set(true);
    
    // Use the database flags (0 or 1) to set roles
    const moderatorStatus = userData.isModerator === 1 || userData.role === 'moderator' || userData.isAdmin === 1;
    const adminStatus = userData.isAdmin === 1 || userData.role === 'admin';
    
    isModerator.set(moderatorStatus);
    isAdmin.set(adminStatus);
}

export function clearUser() {
    user.set({ User_ID: null, Username: '', Email: '', userAvatar: '', role: 'user' });
    isLoggedIn.set(false);
    isModerator.set(false);
    isAdmin.set(false);
}