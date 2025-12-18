import pool from '$lib/server/dbconnect';
import { fail } from '@sveltejs/kit';

export async function load() {
    try {
        // 1. Fetch Pending Reviews
        const [reviews] = await pool.query(`
            SELECT r.*, u.Username, p.Professor_Name, s.Subject_Code 
            FROM Review r
            JOIN User u ON r.User_ID = u.User_ID
            JOIN Professor p ON r.Prof_ID = p.Prof_ID
            JOIN Subject s ON r.Subject_ID = s.Subject_ID
            WHERE r.Status_ID = 1
        `);

        // 2. Fetch Pending Requests (Determining if Prof or Subject)
        const [requests] = await pool.query(`
            SELECT 
                req.Request_ID, 
                req.Status_ID,
                u.Username,
                CASE 
                    WHEN pi.Prof_ID IS NOT NULL THEN 'professor'
                    WHEN si.Subject_ID IS NOT NULL THEN 'subject'
                END AS requestType,
                p.Professor_Name as profName,
                s.Subject_Name as subName,
                s.Subject_Code as subCode
            FROM Request req
            JOIN User u ON req.User_ID = u.User_ID
            LEFT JOIN ProfessorInfo pi ON req.Request_ID = pi.Request_ID
            LEFT JOIN Professor p ON pi.Prof_ID = p.Prof_ID
            LEFT JOIN SubjectInfo si ON req.Request_ID = si.Request_ID
            LEFT JOIN Subject s ON si.Subject_ID = s.Subject_ID
            WHERE req.Status_ID = 1
        `);

        const [reviewHistory] = await pool.query(`
            SELECT r.*, u.Username, p.Professor_Name, s.Subject_Code 
            FROM Review r
            JOIN User u ON r.User_ID = u.User_ID
            JOIN Professor p ON r.Prof_ID = p.Prof_ID
            JOIN Subject s ON r.Subject_ID = s.Subject_ID
            WHERE r.Status_ID != 1
            ORDER BY r.Review_ID DESC
            LIMIT 10
        `);

        const [requestHistory] = await pool.query(`
            SELECT 
                req.Request_ID, 
                req.Status_ID,
                u.Username,
                CASE 
                    WHEN pi.Prof_ID IS NOT NULL THEN 'professor'
                    WHEN si.Subject_ID IS NOT NULL THEN 'subject'
                END AS requestType,
                p.Professor_Name as profName,
                s.Subject_Name as subName,
                s.Subject_Code as subCode
            FROM Request req
            JOIN User u ON req.User_ID = u.User_ID
            LEFT JOIN ProfessorInfo pi ON req.Request_ID = pi.Request_ID
            LEFT JOIN Professor p ON pi.Prof_ID = p.Prof_ID
            LEFT JOIN SubjectInfo si ON req.Request_ID = si.Request_ID
            LEFT JOIN Subject s ON si.Subject_ID = s.Subject_ID
            WHERE req.Status_ID != 1
            ORDER BY req.Request_ID DESC
            LIMIT 10
        `);

        return {
            reviews,
            requests,
            history: [...reviewHistory.map(h => ({...h, category: 'review'})), 
                    ...requestHistory.map(h => ({...h, category: 'request'}))]
                    .sort((a, b) => b.Request_ID || b.Review_ID - (a.Request_ID || a.Review_ID))
                    .slice(0, 10)
        };
    } catch (error) {
        console.error("Database Error:", error);
        return { reviews: [], requests: [] };
    }
}

export const actions = {
    // Action for Reviews
    moderateReview: async ({ request }) => {
        const formData = await request.formData();
        const reviewId = formData.get('reviewId');
        const action = formData.get('action'); // 'approve' or 'reject'
        const statusId = action === 'approve' ? 2 : 3;

        try {
            await pool.query(
                'UPDATE Review SET Status_ID = ? WHERE Review_ID = ?',
                [statusId, reviewId]
            );
            return { success: true };
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Failed to update review status' });
        }
    },

    // Action for Professor/Subject Requests
    moderateRequest: async ({ request }) => {
        const formData = await request.formData();
        const requestId = formData.get('requestId');
        const action = formData.get('action'); // 'approve' or 'reject'
        const statusId = action === 'approve' ? 2 : 3;

        try {
            await pool.query(
                'UPDATE Request SET Status_ID = ? WHERE Request_ID = ?',
                [statusId, requestId]
            );
            return { success: true };
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Failed to update request status' });
        }
    }
};