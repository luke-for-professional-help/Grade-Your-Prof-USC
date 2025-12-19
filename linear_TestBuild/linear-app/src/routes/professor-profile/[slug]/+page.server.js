/** @type {import('./$types').PageServerLoad} */
import { getTeacherWithSubs, getApprovedReviews } from '$lib/server/dbconnect';

export async function load({ params }) {
	try {
		//const profID = url.searchParams.get('');
		console.log('Prof_ID= ', params);
		const teacher = await getTeacherWithSubs(params.slug);
		const reviews = await getApprovedReviews(params.slug);
		console.log('teacher: ', teacher);
		return { teacher, reviews };
	} catch (error) {
		console.error('Database error:', error);
		return { error: 'Could not fetch teacher or reviews' };
	}
}
