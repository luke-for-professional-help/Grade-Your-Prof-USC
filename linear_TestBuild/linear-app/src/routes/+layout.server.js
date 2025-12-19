/** @type {import('./$types').LayoutServerLoad} */
// src/routes/+layout.server.js
export const load = ({ locals }) => {
	return {
		// This is the bridge that makes 'event.locals.user'
		// accessible as 'data.sessionUser' in your layout
		sessionUser: locals.user
	};
};
