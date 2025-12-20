import pool from '$lib/server/dbconnect';
import { fail } from '@sveltejs/kit';

export async function load({ url }) {
    const limit = 4;
    const userPage = parseInt(url.searchParams.get('page') || '1');
    const reqPage = parseInt(url.searchParams.get('reqPage') || '1');
    const blackPage = parseInt(url.searchParams.get('blackPage') || '1');

    try {
        // 1. Fetch Global Statistics
        const [[globalStats]] = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM User) as totalUsers,
                (SELECT COUNT(*) FROM Review) as totalReviews,
                (SELECT COUNT(*) FROM User WHERE Status_ID = 1) as pendingReqs,
                (SELECT COUNT(*) FROM User WHERE Status_ID = 3) as totalBanned
        `);

        // 2. Fetch Approved Users (Status 2) + Stats
        const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM User WHERE Status_ID = 2');
        const [users] = await pool.query(`
            SELECT u.User_ID, u.Username, u.Email, u.isModerator, u.isAdmin,
                (SELECT COUNT(*) FROM Review WHERE User_ID = u.User_ID) as reviewCount,
                (SELECT COUNT(*) FROM Request WHERE User_ID = u.User_ID) as requestCount
            FROM User u WHERE u.Status_ID = 2 
            ORDER BY Username ASC LIMIT ? OFFSET ?
        `, [limit, (userPage - 1) * limit]);

        // 3. Fetch Pending Requests (Status 1)
        const [[{ totalReqs }]] = await pool.query('SELECT COUNT(*) as totalReqs FROM User WHERE Status_ID = 1');
        const [userRequests] = await pool.query(`
            SELECT User_ID, Username, Email FROM User WHERE Status_ID = 1 
            ORDER BY User_ID DESC LIMIT ? OFFSET ?
        `, [limit, (reqPage - 1) * limit]);

        // 4. Fetch Blacklist (Status 3)
        const [[{ totalBlack }]] = await pool.query('SELECT COUNT(*) as totalBlack FROM User WHERE Status_ID = 3');
        const [blacklist] = await pool.query(`
            SELECT User_ID, Username, Email, Ban_Time FROM User WHERE Status_ID = 3 
            ORDER BY User_ID DESC LIMIT ? OFFSET ?
        `, [limit, (blackPage - 1) * limit]);

        return { 
            globalStats,
            users,
            userRequests,
            blacklist,
            pagination: {
                userPage, reqPage, blackPage,
                totalUserPages: Math.ceil(totalUsers / limit) || 1,
                totalReqPages: Math.ceil(totalReqs / limit) || 1,
                totalBlackPages: Math.ceil(totalBlack / limit) || 1
            }
        };
    } catch (error) {
        console.error(error);
        return { users: [], userRequests: [], blacklist: [] };
    }
}

export const actions = {
    moderateUser: async ({ request }) => {
        const data = await request.formData();
        const userId = data.get('userId');
        const action = data.get('action'); 
        const statusId = action === 'approve' ? 2 : 3;
        await pool.query('UPDATE User SET Status_ID = ?, Ban_Time = NULL WHERE User_ID = ?', [statusId, userId]);
        return { success: true };
    },
    banUser: async ({ request }) => {
        const data = await request.formData();
        const userId = data.get('userId');
        const banHours = parseInt(data.get('banHours') || '24');
        await pool.query(`UPDATE User SET Status_ID = 3, Ban_Time = DATE_ADD(NOW(), INTERVAL ? HOUR) WHERE User_ID = ?`, [banHours, userId]);
        return { success: true };
    },
    deleteUser: async ({ request }) => {
    const data = await request.formData();
    const userId = data.get('userId');

    try {
        // Start a transaction so if one fails, none happen
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Delete reviews written by this user
        await connection.query('DELETE FROM review WHERE User_ID = ?', [userId]);

        // 2. Handle requests (Note: subjectinfo and professorinfo depend on Request_ID)
        // First, find the Request_IDs belonging to this user
        const [userReqs] = await connection.query('SELECT Request_ID FROM request WHERE User_ID = ?', [userId]);
        const reqIds = userReqs.map(r => r.Request_ID);

        if (reqIds.length > 0) {
            // Delete from child tables of request
            await connection.query('DELETE FROM subjectinfo WHERE Request_ID IN (?)', [reqIds]);
            await connection.query('DELETE FROM professorinfo WHERE Request_ID IN (?)', [reqIds]);
            // Delete the requests themselves
            await connection.query('DELETE FROM request WHERE User_ID = ?', [userId]);
        }

        // 3. Finally, delete the user
        await connection.query('DELETE FROM User WHERE User_ID = ?', [userId]);

        await connection.commit();
        connection.release();
        
        return { success: true };
    } catch (err) {
        console.error("Deletion Error:", err);
        return fail(500, { message: 'Could not delete user due to existing activity.' });
    }
},
    updateRole: async ({ request }) => {
        const data = await request.formData();
        const userId = data.get('userId');
        const newRole = data.get('newRole');
        const isMod = (newRole === 'mod' || newRole === 'admin') ? 1 : 0;
        const isAdmin = newRole === 'admin' ? 1 : 0;
        await pool.query('UPDATE User SET isModerator = ?, isAdmin = ? WHERE User_ID = ?', [isMod, isAdmin, userId]);
        return { success: true };
    }
};