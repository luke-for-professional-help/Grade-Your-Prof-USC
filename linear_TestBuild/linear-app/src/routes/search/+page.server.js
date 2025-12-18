import pool from '$lib/server/dbconnect';
import { getSearchResults } from '$lib/server/dbconnect.js';

export async function load({ url }) {
	try {
		const query = url.searchParams.get('term');
		// Use the pool to query
		const rows = await getSearchResults(query);
		return {
			rows
		};
	} catch (error) {
		console.error('Database error:', error);
		return { results: [], error: 'Could not fetch data' };
	}
}
