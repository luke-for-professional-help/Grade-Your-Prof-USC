import db from '$lib/server/dbconnect';
import { fail } from '@sveltejs/kit';

export async function load() {
    try {
        // Fetch Pending Reviews
        const [reviews] = await db.query(`
            SELECT r.*, u.Username, p.Professor_Name, s.Subject_Name 
            FROM Review r
            JOIN User u ON r.User_ID = u.User_ID
            JOIN Professor p ON r.Prof_ID = p.Prof_ID
            JOIN Subject s ON r.Subject_ID = s.Subject_ID
            WHERE r.Status_ID = 1
        `);

        // Fetch Pending Requests (Requests to add new Proffs/Subjects)
        const [requests] = await db.query(`
            SELECT req.*, u.Username
            FROM Request req
            JOIN User u ON req.User_ID = u.User_ID
            WHERE req.Status_ID = 1
        `);

        return { reviews, requests };
    } catch (error) {
        console.error("Moderator Load Error:", error);
        return { reviews: [], requests: [] };
    }
}

export const actions = {
    moderateReview: async ({ request }) => {
        const formData = await request.formData();
        const reviewId = formData.get('reviewId');
        const action = formData.get('action'); // '2' for approve, '3' for reject

        if (!reviewId || !action) return fail(400, { message: 'Missing data' });

        await db.query('UPDATE Review SET Status_ID = ? WHERE Review_ID = ?', [action, reviewId]);
        
        return { success: true };
    }
};