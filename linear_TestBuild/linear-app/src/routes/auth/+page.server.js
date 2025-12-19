import { addAccount, loginAccount } from '$lib/server/dbconnect.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('user_name');
        const password = formData.get('password');

        try {
            const user = await loginAccount(username, password);

            if (!user) {
                return fail(401, { error: 'Invalid Username or password!' });
            }

            cookies.set('User_ID', user.User_ID.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7
            });

            return { success: true, user };
        } catch (err) {
            // This captures the "You are currently banned..." message
            return fail(403, { error: err.message });
        }
    },

    signup: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('user_name');
        const email = formData.get('email');
        const password = formData.get('password');
        
        try {
            await addAccount(username, email, password);
            return { 
                success: true, 
                pendingApproval: true, 
                message: 'Account created! Pending Admin approval.' 
            };
        } catch (err) {
            return fail(400, { error: 'Signup failed. User may exist.' });
        }
    },

    logout: async ({ cookies }) => {
        cookies.delete('User_ID', { path: '/' });
        throw redirect(303, '/auth');
    }
};