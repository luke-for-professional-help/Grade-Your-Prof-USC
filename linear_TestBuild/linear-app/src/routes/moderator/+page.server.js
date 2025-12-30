import pool from '$lib/server/dbconnect';
import { fail } from '@sveltejs/kit';

export async function load({ url }) {
    const limit = 5;

    const revPage = parseInt(url.searchParams.get('revPage') || '1');
    const reqPage = parseInt(url.searchParams.get('reqPage') || '1');
    const histPage = parseInt(url.searchParams.get('histPage') || '1');

    try {
        // --- 1. PENDING REVIEWS ---
        const [[{ totalReviews }]] = await pool.query('SELECT COUNT(*) as totalReviews FROM review WHERE Status_ID = 1');
        const [reviews] = await pool.query(`
            SELECT 
                r.Review_ID, 
                r.Rating, 
                r.Description,   -- This matches your DB structure
                r.Status_ID, 
                r.Study_Load, 
                u.Username, 
                p.Professor_Name, 
                s.Subject_Code
            FROM review r 
            JOIN user u ON r.User_ID = u.User_ID
            JOIN professor p ON r.Prof_ID = p.Prof_ID 
            JOIN subject s ON r.Subject_ID = s.Subject_ID
            WHERE r.Status_ID = 1 LIMIT ? OFFSET ?`, [limit, (revPage - 1) * limit]);

        // --- 2. PENDING REQUESTS ---
        const [[{ totalRequests }]] = await pool.query('SELECT COUNT(*) as totalRequests FROM request WHERE Status_ID = 1');
        const [requests] = await pool.query(`
        SELECT req.Request_ID, req.Status_ID, req.Study_Load, u.Username,
        CASE WHEN pi.Prof_ID IS NOT NULL THEN 'professor' ELSE 'subject' END AS requestType,
        p.Professor_Name as profName, 
        p.Professor_Img as profImg, -- Add this line
        s.Subject_Name as subName, s.Subject_Code as subCode
        FROM request req JOIN user u ON req.User_ID = u.User_ID
        LEFT JOIN professorInfo pi ON req.Request_ID = pi.Request_ID
        LEFT JOIN professor p ON pi.Prof_ID = p.Prof_ID
        LEFT JOIN subjectInfo si ON req.Request_ID = si.Request_ID
        LEFT JOIN subject s ON si.Subject_ID = s.Subject_ID
        WHERE req.Status_ID = 1 LIMIT ? OFFSET ?`, [limit, (reqPage - 1) * limit]);

        // --- 3. APPROVAL HISTORY ---
        const [revHist] = await pool.query(`
            SELECT r.*, u.Username, p.Professor_Name, s.Subject_Code, 'review' as category 
            FROM review r JOIN user u ON r.User_ID = u.User_ID
            JOIN professor p ON r.Prof_ID = p.Prof_ID JOIN subject s ON r.Subject_ID = s.Subject_ID
            WHERE r.Status_ID != 1`);

        const [reqHist] = await pool.query(`
            SELECT req.Request_ID, req.Status_ID, u.Username, 'request' as category,
            CASE WHEN pi.Prof_ID IS NOT NULL THEN 'professor' ELSE 'subject' END AS requestType,
            p.Professor_Name as profName, s.Subject_Name as subName, s.Subject_Code as subCode
            FROM request req JOIN user u ON req.User_ID = u.User_ID
            LEFT JOIN professorInfo pi ON req.Request_ID = pi.Request_ID
            LEFT JOIN professor p ON pi.Prof_ID = p.Prof_ID
            LEFT JOIN subjectInfo si ON req.Request_ID = si.Request_ID
            LEFT JOIN subject s ON si.Subject_ID = s.Subject_ID
            WHERE req.Status_ID != 1`);

        const combinedHistory = [...revHist, ...reqHist]
            .sort((a, b) => (b.Review_ID || b.Request_ID) - (a.Review_ID || a.Request_ID));

        return {
            reviews,
            requests,
            history: combinedHistory.slice((histPage - 1) * limit, histPage * limit),
            pagination: {
                revPage,
                reqPage,
                histPage,
                totalRevPages: Math.ceil(totalReviews / limit) || 1,
                totalReqPages: Math.ceil(totalRequests / limit) || 1,
                totalHistPages: Math.ceil(combinedHistory.length / limit) || 1
            }
        };
    } catch (error) {
        console.error(error);
        return { reviews: [], requests: [], history: [], pagination: { revPage: 1, reqPage: 1, histPage: 1, totalRevPages: 1, totalReqPages: 1, totalHistPages: 1 } };
    }
}

export const actions = {
    moderateReview: async ({ request }) => {
        const formData = await request.formData();
        const statusId = formData.get('action') === 'approve' ? 2 : 3;
        await pool.query('UPDATE review SET Status_ID = ? WHERE Review_ID = ?', [statusId, formData.get('reviewId')]);
        return { success: true };
    },
    moderateRequest: async ({ request }) => {
        const formData = await request.formData();
        const statusId = formData.get('action') === 'approve' ? 2 : 3;
        await pool.query('UPDATE request SET Status_ID = ? WHERE Request_ID = ?', [statusId, formData.get('requestId')]);
        return { success: true };
    },
    // NEW: Permanent Deletion Actions
    deleteReview: async ({ request }) => {
        const formData = await request.formData();
        const reviewId = formData.get('reviewId');
        await pool.query('DELETE FROM review WHERE Review_ID = ?', [reviewId]);
        return { success: true };
    },
    deleteRequest: async ({ request }) => {
        const formData = await request.formData();
        const requestId = formData.get('requestId');
        
        /** * Note: Because of foreign key constraints in ProfessorInfo/SubjectInfo,
         * you may need to delete those links first or ensure ON DELETE CASCADE is set.
         **/
        await pool.query('DELETE FROM professorInfo WHERE Request_ID = ?', [requestId]);
        await pool.query('DELETE FROM subjectInfo WHERE Request_ID = ?', [requestId]);
        await pool.query('DELETE FROM request WHERE Request_ID = ?', [requestId]);
        
        return { success: true };
    }
};