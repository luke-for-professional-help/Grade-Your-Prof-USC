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
		if (!username || !password) {
			throw new error(400, 'Fields must be complete');
		}

		const user = await loginAccount(username, password);

		if(!user){
			throw error(401, 'Invalid username or password!');
		}
	
		cookies.set('userId', user.userId.toString(), {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		});

		return { 
			success: true,
			user: {
				userId: user.userId, 
				userName: user.userName,
				userEmail: user.userEmail,
				role: user.role
			}
		};
	},

	signup: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('user_name');
		const email = formData.get('email');
		const password = formData.get('pass');
		
		if(!email || !password || !username ){
			throw error(400, 'All fields must be complete!');
		}

		if(password !== confirmPassword){
			throw error(400, 'Passwords do not match');
		}

		try {
			const newUser = await addAccount(username, email, password);

			return {
				success: true,
				messahe: 'Account created successfully!',
				user: {
					userId: newUser.userId,
					userName: newUser.userName,
					userEmail: newUser.userEmail
				}
			};
		} catch (err){
			throw error(400, 'Failed to create account!');
		}
	}
};
