import { writable } from 'svelte/store';

export const isLoggedIn = writable(false); //regular member
export const isModerator = writable(false); //can manage user generated reviews
export const isAdmin = writable(false); //can manage user roles and site settings

export const user = writable({
	User_ID: null,
	Username: '',
	Email:'',
	userAvatar: '',
	role: 'user'
});

//THESE ARE PLACEHOLDER VALUES FOR NOW


export function setUser(userData) {
	user.set({
		User_ID: userData.User_ID,
		Username: userData.Username,
		Email: userData.Email,
		userAvatar: userData.userAvatar || '',
		role: userData.role || 'user'
	});


	isLoggedIn.set(true);
	isModerator.set(userData.role === 'moderator' || userData.role === 'admin');
	isAdmin.set(userData.role === 'admin');
}

export function clearUser(){
	user.set({
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