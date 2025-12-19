import { getTeacherWithSubs, getApprovedReviews, getAverageRating } from '$lib/server/dbconnect';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const profID = params.slug;
        
        // Fetch all data in parallel for better performance
        const [teacherRows, reviews, stats] = await Promise.all([
            getTeacherWithSubs(profID),
            getApprovedReviews(profID),
            getAverageRating(profID)
        ]);

        return { 
            teacherRows: teacherRows || [], 
            reviews: (reviews || []).map(r => ({ ...r, Rating: +r.Rating })),
            stats: stats ? { avgRating: +stats.avgRating, totalReviews: stats.totalReviews } : { avgRating: 0, totalReviews: 0 },
            profID 
        };
    } catch (error) {
        console.error('Database error:', error);
        return { error: 'Could not fetch professor profile' };
    }
}