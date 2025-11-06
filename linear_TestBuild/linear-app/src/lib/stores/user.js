import { writable } from 'svelte/store';

export const isLoggedIn = writable(true);
export const isMember = writable(false);
export const user = writable({
	name: 'Luke',
	email: 'placeholder@gmail.com',
	avatar: ''
});
