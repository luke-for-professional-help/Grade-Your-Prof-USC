import pool from '$lib/server/dbconnect';

export async function load() {
    try {
        // Use the pool to query
        const [rows] = await pool.query('SELECT * FROM professors');
        
        return {
            professors: rows
        };
    } catch (error) {
        console.error("Database error:", error);
        return { professors: [], error: "Could not fetch data" };
    }
}