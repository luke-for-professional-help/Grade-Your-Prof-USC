import { getTeacherWithSubs, getAllProfessors, addReview } from '$lib/server/dbconnect';
import { redirect, fail } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    // 1. Get the ID from the URL (e.g., /createpage?prof_ID=1)
    const profID = url.searchParams.get('prof_ID');
    
    // 2. Redirect if the ID is missing to prevent the 'map' error
    if (!profID) {
        throw redirect(307, '/search');
    }

    try {
        // 3. Fetch data from DB
        const allProfs = await getAllProfessors();
        const profSubjects = await getTeacherWithSubs(profID);

        return { 
            allProfs: allProfs || [],
            // Ensure this is NEVER undefined, even if no subjects are found
            profSubjects: profSubjects || [], 
            profID 
        };
    } catch (error) {
        console.error("Load error:", error);
        return { allProfs: [], profSubjects: [], profID };
    }
}

export const actions = {
    addReview: async ({ request, url, cookies }) => {
        const profID = url.searchParams.get('prof_ID');
        const user_ID = cookies.get('User_ID');
        const formData = await request.formData();

        const rating = parseFloat(formData.get('rating')?.toString() || '0');
        const subjectID = formData.get('subjectID');
        const description = formData.get('message');
        const file = formData.get('studyLoad');

        if (!user_ID) return fail(401, { message: 'Not authenticated' });

        if (!(file instanceof File) || file.size === 0) {
            return fail(400, { message: 'File is required' });
        }

        // Keep the actual filename for the physical save
        const fileName = `${user_ID}_${Date.now()}_${file.name.replaceAll(' ', '_')}`;
        const filePath = path.join(process.cwd(), 'static', 'docus', fileName);

        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(filePath, buffer);

            const dateForDB = new Date().toISOString().split('T')[0];
            
            // FIX: Prepend "/docus/" so the database stores the correct web path
            const dbPath = `/docus/${fileName}`;

            // Save dbPath instead of fileName
            await addReview(user_ID, profID, subjectID, dateForDB, description, dbPath, 1, rating);
        } catch (err) {
            console.error('addReview error:', err);
            return fail(500, { message: 'Failed to save review' });
        }

        throw redirect(303, `/professor-profile/${profID}`);
    }
};