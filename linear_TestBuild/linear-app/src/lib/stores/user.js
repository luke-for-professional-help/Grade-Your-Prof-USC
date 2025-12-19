import { writable } from 'svelte/store';

export const isLoggedIn = writable(false); //regular member
export const isModerator = writable(false); //can manage userData generated reviews
export const isAdmin = writable(false); //can manage userData roles and site settings

export const userData = writable({
	userId: null,
	userName: '',
	userEmail: '',
	userAvatar: '',
	role: 'userData'
});

//THESE ARE PLACEHOLDER VALUES FOR NOW

export function setUser(userData) {
	userData.set({
		User_ID: userData.User_ID,
		Username: userData.Username,
		Email: userData.Email,
		userAvatar: userData.userAvatar || '',
		role: userData.role || 'userData'
	});

	isLoggedIn.set(true);
	isModerator.set(userData.role === 'moderator' || userData.role === 'admin');
	isAdmin.set(userData.role === 'admin');
}

export function clearUser() {
	userData.set({
		User_ID: null,
		Username: '',
		Email: '',
		userAvatar: '',
		role: 'user'
	});

	isLoggedIn.set(false);
	isModerator.set(false);
	isAdmin.set(false);
}
