import { addAccount, loginAccount, loginAcc } from '$lib/server/dbconnect.js';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { isLoggedIn } from '$lib/stores/user';


export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const Username = formData.get('user_name');
		const password = formData.get('password');
		if (!Username || !password) {
			throw error(400, 'Fields must be complete');
		}

		const user = await loginAccount(Username, password);

		if(!user){
			throw error(401, 'Invalid Username or password!');
		}
	
		cookies.set('User_ID', user.User_ID.toString(), {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		});

		return { 
			success: true,
			user: {
				User_ID: user.User_ID, 
				Username: user.Username,
				Email: user.Email,
				role: user.role
			}
		};
	},

	signup: async ({ request }) => {
		const formData = await request.formData();
		const Username = formData.get('user_name');
		const email = formData.get('email');
		const password = formData.get('password');
		const confirm_password = formData.get('confirm_password');
		
		if(!email || !password || !Username ){
			throw error(400, 'All fields must be complete!');
		}

		if(password !== confirm_password){
			throw error(400, 'Passwords do not match');
		}

		try {
			const newUser = await addAccount(Username, email, password);

			return {
				success: true,
				message: 'Account created successfully!',
				user: {
					User_ID: newUser.User_ID,
					Username: newUser.Username,
					Email: newUser.Email
				}
			};
		} catch (err){
			console.error(err);
			throw error(400, 'Failed to create account!');
		}
	}
};
