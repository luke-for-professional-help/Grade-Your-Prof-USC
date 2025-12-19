import { redirect } from '@sveltejs/kit';
import { findUser } from '$lib/server/dbconnect.js';

export async function handle({ event, resolve }) {
    const userId = event.cookies.get('User_ID');

    if (userId) {
        const user = await findUser(userId);
        if (user && user.Status_ID === 2) {
            event.locals.user = user;
        } else {
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    // Protection: If session is gone but user is on a protected route
    const isProtected = event.url.pathname.startsWith('/admin') || 
                        event.url.pathname.startsWith('/moderator');
                        
    if (isProtected && !event.locals.user) {
        throw redirect(303, '/');
    }

    return await resolve(event);
}