import pool from '$lib/server/dbconnect';

export async function load({ url }) {
    const limit = 4;
    const page = parseInt(url.searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    try {
        const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM User');
        const [users] = await pool.query(`
            SELECT User_ID, Username, Email, isModerator, isAdmin 
            FROM User ORDER BY Username ASC LIMIT ? OFFSET ?
        `, [limit, offset]);

        return { 
            users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit) || 1
            }
        };
    } catch (error) {
        return { users: [], pagination: { currentPage: 1, totalPages: 1 } };
    }
}

export const actions = {
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