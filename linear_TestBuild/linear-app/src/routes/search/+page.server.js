import pool from '$lib/server/dbconnect';
import { getSearchResults}  from "$lib/server/dbconnect.js";

export async function load() {
    try {
        // Use the pool to query
        const [rows] = await getSearchResults(data["query"]);
        console.log(data["query"]);
        return {
            results: rows
        };
    } catch (error) {
        console.error("Database error:", error);
        return { results: [], error: "Could not fetch data" };
    }
}