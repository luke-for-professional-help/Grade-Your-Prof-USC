import pool from '$lib/server/dbconnect';

export async function load() {
    try {
        const [users] = await pool.query(`
            SELECT User_ID, Username, Email, isModerator, isAdmin 
            FROM User
        `);
        return { users };
    } catch (error) {
        return { users: [] };
    }
}

export const actions = {
    // Action to toggle Moderator status
    toggleMod: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const currentStatus = data.get('isMod') === 'true';
        
        await pool.query(
            'UPDATE User SET isModerator = ? WHERE User_ID = ?', 
            [!currentStatus, id]
        );
    }
};