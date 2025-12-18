import { writable } from 'svelte/store';

export const isLoggedIn = writable(false); //regular member
export const isModerator = writable(true); //can manage user generated reviews
export const isAdmin = writable(true); //can manage user roles and site settings

//placeholder values
export const user = writable({
	name: 'Ethan',
	email: 'placeholder@gmail.com',
	avatar: ''
});

//THESE ARE PLACEHOLDER VALUES FOR NOW
