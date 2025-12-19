import { addAccount, loginAccount } from '$lib/server/dbconnect.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('user_name');
        const password = formData.get('password');

        if (!username || !password) {
            return fail(400, { error: 'Fields must be complete' });
        }

        const user = await loginAccount(username, password);
        if (!user) {
            return fail(401, { error: 'Invalid Username or password!' });
        }
    
        cookies.set('User_ID', user.User_ID.toString(), {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        // Return data instead of throwing redirect so the client can 'setUser'
        // Inside your login action
		return { 
			success: true,
			user: {
				User_ID: user.User_ID, 
				Username: user.Username,
				Email: user.Email,
				isModerator: user.isModerator, // Pass these so setUser() can work
				isAdmin: user.isAdmin
			}
		};
    },

    signup: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('user_name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirm = formData.get('confirm_password');
        
        if (password !== confirm) {
            return fail(400, { error: 'Passwords do not match' });
        }

        try {
            const newUser = await addAccount(username, email, password);
            
            cookies.set('User_ID', newUser.User_ID.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict'
            });

            return {
                success: true,
                user: newUser
            };
        } catch (err) {
            return fail(400, { error: 'Failed to create account. Username or Email may exist.' });
        }
    },

    logout: async ({ cookies }) => {
        cookies.delete('User_ID', { path: '/' });
        throw redirect(303, '/auth');
    }
};