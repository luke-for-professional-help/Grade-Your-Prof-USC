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
                (SELECT COUNT(*) FROM user) as totalUsers,
                (SELECT COUNT(*) FROM Review) as totalReviews,
                (SELECT COUNT(*) FROM user WHERE Status_ID = 1) as pendingReqs,
                (SELECT COUNT(*) FROM user WHERE Status_ID = 3) as totalBanned
        `);

        // 2. Fetch Approved Users (Status 2) + Stats
        const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM user WHERE Status_ID = 2');
        const [users] = await pool.query(`
            SELECT u.User_ID, u.Username, u.Email, u.isModerator, u.isAdmin,
                (SELECT COUNT(*) FROM Review WHERE User_ID = u.User_ID) as reviewCount,
                (SELECT COUNT(*) FROM Request WHERE User_ID = u.User_ID) as requestCount
            FROM user u WHERE u.Status_ID = 2 
            ORDER BY Username ASC LIMIT ? OFFSET ?
        `, [limit, (userPage - 1) * limit]);

        // 3. Fetch Pending Requests (Status 1)
        const [[{ totalReqs }]] = await pool.query('SELECT COUNT(*) as totalReqs FROM user WHERE Status_ID = 1');
        const [userRequests] = await pool.query(`
            SELECT User_ID, Username, Email FROM user WHERE Status_ID = 1 
            ORDER BY User_ID DESC LIMIT ? OFFSET ?
        `, [limit, (reqPage - 1) * limit]);

        // 4. Fetch Blacklist (Status 3)
        const [[{ totalBlack }]] = await pool.query('SELECT COUNT(*) as totalBlack FROM user WHERE Status_ID = 3');
        const [blacklist] = await pool.query(`
            SELECT User_ID, Username, Email, Ban_Time FROM user WHERE Status_ID = 3 
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
        await pool.query('UPDATE user SET Status_ID = ?, Ban_Time = NULL WHERE User_ID = ?', [statusId, userId]);
        return { success: true };
    },
    banUser: async ({ request }) => {
        const data = await request.formData();
        const userId = data.get('userId');
        const banHours = parseInt(data.get('banHours') || '24');
        await pool.query(`UPDATE user SET Status_ID = 3, Ban_Time = DATE_ADD(NOW(), INTERVAL ? HOUR) WHERE User_ID = ?`, [banHours, userId]);
        return { success: true };
    },
    deleteUser: async ({ request }) => {
        const data = await request.formData();
        const userId = data.get('userId');
        await pool.query('DELETE FROM user WHERE User_ID = ?', [userId]);
        return { success: true };
    },
    updateRole: async ({ request }) => {
        const data = await request.formData();
        const userId = data.get('userId');
        const newRole = data.get('newRole');
        const isMod = (newRole === 'mod' || newRole === 'admin') ? 1 : 0;
        const isAdmin = newRole === 'admin' ? 1 : 0;
        await pool.query('UPDATE user SET isModerator = ?, isAdmin = ? WHERE User_ID = ?', [isMod, isAdmin, userId]);
        return { success: true };
    }
};