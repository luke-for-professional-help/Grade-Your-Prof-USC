import { findUser } from '$lib/server/dbconnect.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const userId = event.cookies.get('User_ID');

    if (!userId) {
        event.locals.user = null;
        return await resolve(event);
    }

    try {
        // Fetch the latest user data from your DB
        const user = await findUser(userId);
        
        if (user) {
            event.locals.user = {
                User_ID: user.User_ID,
                Username: user.Username,
                Email: user.Email,
                isModerator: user.isModerator,
                isAdmin: user.isAdmin
            };
        } else {
            event.locals.user = null;
        }
    } catch (err) {
        event.locals.user = null;
    }

    return await resolve(event);
}