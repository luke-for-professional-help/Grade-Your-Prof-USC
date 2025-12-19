import pool from '$lib/server/dbconnect';

export async function load() {
    try {
        // Use the pool to query
        const [rows] = await pool.query('SELECT * FROM professor');
        
        return {
            professors: rows
        };
    } catch (error) {
        console.error("Database error:", error);
        return { professors: [], error: "Could not fetch data" };
    }
}

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    return {
        sessionUser: locals.user
    };
}