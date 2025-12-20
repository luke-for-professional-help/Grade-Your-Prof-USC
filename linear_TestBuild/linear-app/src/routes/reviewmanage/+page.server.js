import pool from '$lib/server/dbconnect';
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const user_ID = cookies.get('User_ID');
    if (!user_ID) throw redirect(303, '/login');

    try {
        // 1. Fetch User's Reviews
        const [reviews] = await pool.query(`
            SELECT r.Review_ID, r.Date, r.Status_ID, p.Professor_Name, s.Subject_Code
            FROM review r
            JOIN professor p ON r.Prof_ID = p.Prof_ID
            JOIN subject s ON r.Subject_ID = s.Subject_ID
            WHERE r.User_ID = ?
            ORDER BY r.Date DESC`, [user_ID]);

        // 2. Fetch User's Requests (Professors/Subjects/Reassignments)
        const [requests] = await pool.query(`
            SELECT req.Request_ID, req.Status_ID,
            p.Professor_Name as profName, 
            s.Subject_Code as subCode, s.Subject_Name as subName
            FROM request req
            LEFT JOIN professorinfo pi ON req.Request_ID = pi.Request_ID
            LEFT JOIN professor p ON pi.Prof_ID = p.Prof_ID
            LEFT JOIN subjectinfo si ON req.Request_ID = si.Request_ID
            LEFT JOIN subject s ON si.Subject_ID = s.Subject_ID
            WHERE req.User_ID = ?
            ORDER BY req.Request_ID DESC`, [user_ID]);

        return { reviews, requests };
    } catch (err) {
        console.error(err);
        return { reviews: [], requests: [] };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    deleteReview: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('reviewId');
        await pool.query('DELETE FROM review WHERE Review_ID = ?', [id]);
        return { success: true };
    },
    deleteRequest: async ({ request }) => {
        const formData = await request.formData();
        const rid = formData.get('requestId');
        // Clean up junction tables first
        await pool.query('DELETE FROM professorinfo WHERE Request_ID = ?', [rid]);
        await pool.query('DELETE FROM subjectinfo WHERE Request_ID = ?', [rid]);
        await pool.query('DELETE FROM request WHERE Request_ID = ?', [rid]);
        return { success: true };
    }
};