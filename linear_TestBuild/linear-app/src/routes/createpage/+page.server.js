import { addReview, getAllProfessors, getTeacherWithSubs } from '$lib/server/dbconnect';
import { redirect, fail } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies }) {
    const profID = url.searchParams.get('prof_ID');
    const user_ID = cookies.get('User_ID');

    if (!profID) throw redirect(307, '/search');

    const allProfs = await getAllProfessors();
    const profSubjects = await getTeacherWithSubs(profID) || []; 
    
    return { allProfs, profSubjects, profID };
}

/** @type {import('./$types').Actions} */
export const actions = {
    addReview: async ({ request, url, cookies }) => {
        const profID = url.searchParams.get('prof_ID');
        const user_ID = cookies.get('User_ID');
        
        if (!user_ID) return fail(401, { message: "User not logged in" });

        const formData = await request.formData();
        
        // 1. Parse Data
        const rating = parseFloat(formData.get('rating')?.toString() || "0");
        const subjectID = formData.get('subjectID');
        const description = formData.get('message');
        const file = formData.get('studyLoad'); // This is a File object

        // Check if file exists
        if (!(file instanceof File) || file.size === 0) {
            return fail(400, { message: "No file uploaded" });
        }

        // 2. Define Save Path
        // We create a unique name to prevent overwriting files with the same name
        const uniqueFileName = `${user_ID}_${Date.now()}_${file.name.replaceAll(' ', '_')}`;
        const uploadDirectory = path.join(process.cwd(), 'static', 'docus');
        const filePath = path.join(uploadDirectory, uniqueFileName);

        // 3. Save File to Disk
        try {
            // Ensure directory exists
            if (!fs.existsSync(uploadDirectory)) {
                fs.mkdirSync(uploadDirectory, { recursive: true });
            }

            // Convert File to Buffer and write
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs.writeFileSync(filePath, buffer);
            
            console.log("File saved successfully to:", filePath);
        } catch (err) {
            console.error("FileSystem Error:", err);
            return fail(500, { message: "Failed to save the study load document." });
        }

        // 4. Save to Database
        try {
            const dateForDB = new Date().toISOString().split('T')[0];
            // Match your schema: (User_ID, Prof_ID, Subject_ID, Date, Description, Study_Load, Status_ID, Rating)
            await addReview(user_ID, profID, subjectID, dateForDB, description, uniqueFileName, 1, rating);
        } catch (err) {
            console.error("Database Error:", err);
            return fail(500, { message: "Database error. The file was saved but the record was not." });
        }

        throw redirect(303, `/professor-profile/${profID}`);
    }
};