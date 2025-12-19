/** @type {import('./$types').PageServerLoad} */
import { getTeacherWithSubs, getApprovedReviews } from '$lib/server/dbconnect';

export async function load() {
	try {

		const teacher = await getTeacherWithSubs();
		const reviews = await getApprovedReviews();
		console.log(reviews);
		return { teacher, reviews };
	} catch (error) {
		console.error('Database error:', error);
		return { error: 'Could not fetch teacher or reviews' };
	}
}
