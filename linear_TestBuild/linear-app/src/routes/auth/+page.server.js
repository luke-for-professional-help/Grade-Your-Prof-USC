import { addAccount, loginAccount, loginAcc } from '$lib/server/dbconnect.js';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { isLoggedIn } from '$lib/stores/user';

// export async function load() {
// 	const accounts = await ();
// 	//console.log(accounts);
// 	console.log('Email[0]= ' + accounts[1].Email);
// 	if (!accounts) error(404);
// 	return { accounts };
// }

export const actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('user_name');
		const password = formData.get('pass');
		if (!username || !password) throw new error('Fields must be complete');
		const user = await loginAccount(username, password);
		if (user) {
			console.log('sheeshh signup works');
			isLoggedIn.set(true);
		} else {
			console.log('mehn it dont work');
		}
		console.log(user);
		cookies.set('User_ID', user.User_ID, { path: '/' });

		return { success: true };
	},

	signup: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('user_name');
		const email = formData.get('email');
		const password = formData.get('pass');
		console.log('Account to be added: ', username, email, password);
		if (!email || !password || !username) throw new error('Fields must be complete');
		await addAccount(username, email, password);
		return { success: true };
	}
};
