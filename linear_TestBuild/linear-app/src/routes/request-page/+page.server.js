import { addProfessor, makeReq, reqProfOnly, addSubject, reqSubOnly } from '$lib/server/dbconnect';
import { redirect, fail } from '@sveltejs/kit';
import fs from 'node:fs';
import path from 'node:path';

import pool from '$lib/server/dbconnect';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        // Fetch only approved professors (Status_ID = 2)
        const [profs] = await pool.query(`
            SELECT DISTINCT p.Prof_ID, p.Professor_Name 
            FROM professor p
            INNER JOIN professorinfo pi ON p.Prof_ID = pi.Prof_ID
            INNER JOIN request r ON pi.Request_ID = r.Request_ID
            WHERE r.Status_ID = 2
            ORDER BY p.Professor_Name ASC
        `);

        // Fetch all subjects for the dropdown
        const [subs] = await pool.query('SELECT Subject_ID, Subject_Code, Subject_Name FROM subject ORDER BY Subject_Code ASC');

        return {
            allProfs: profs || [],
            allSubjects: subs || []
        };
    } catch (err) {
        console.error("Load error:", err);
        return {
            allProfs: [],
            allSubjects: []
        };
    }
}

export const actions = {
    addProf: async ({ request, cookies }) => {
        const user_ID = cookies.get('User_ID');
        if (!user_ID) throw redirect(303, '/login');

        const formData = await request.formData();
        const profName = formData.get('profName');
        const file = formData.get('profImg');
        
        let dbImgPath = '/prof_imgs/placeholder.png'; // Default placeholder

        // 1. Handle Image Upload if file exists
        if (file && file instanceof File && file.size > 0) {
            const fileName = `${Date.now()}_${file.name.replaceAll(' ', '_')}`;
            const uploadDir = path.resolve('static', 'prof_imgs');
            const filePath = path.join(uploadDir, fileName);

            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
            
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(filePath, buffer);
            dbImgPath = `/prof_imgs/${fileName}`;
        }

        try {
            // 2. Create the Professor record
            const profResult = await addProfessor(profName, dbImgPath);
            const newProfID = profResult.insertId;

            // 3. Create the Request entry (Status 1 = Pending)
            const reqResult = await makeReq(user_ID);
            const newReqID = reqResult.insertId;

            // 4. Link them in professorinfo
            await reqProfOnly(newProfID, newReqID);

            return { success: true, message: "Professor request submitted for approval!" };
        } catch (err) {
            console.error(err);
            return fail(500, { message: "Failed to submit professor request." });
        }
    },

    addSubject: async ({ request, cookies }) => {
        const user_ID = cookies.get('User_ID');
        if (!user_ID) throw redirect(303, '/login');

        const formData = await request.formData();
        const subCode = formData.get('subCode');
        const subName = formData.get('subName');

        try {
            // 1. Create Subject
            const subResult = await addSubject(subCode, subName);
            const newSubID = subResult.insertId;

            // 2. Create Request
            const reqResult = await makeReq(user_ID);
            const newReqID = reqResult.insertId;

            // 3. Link them in subjectinfo
            await reqSubOnly(newReqID, newSubID);

            return { success: true, message: "Subject request submitted!" };
        } catch (err) {
            console.error(err);
            return fail(500, { message: "Failed to submit subject request." });
        }
    },

    assignSubject: async ({ request, cookies }) => {
        const user_ID = cookies.get('User_ID');
        if (!user_ID) return fail(401, { message: "Unauthorized" });

        const formData = await request.formData();
        const profID = formData.get('profID');
        const subjectID = formData.get('subjectID');

        if (!profID || !subjectID) {
            return fail(400, { message: "Selection required." });
        }

        try {
            // 1. Create a FRESH Request (Status_ID = 1 by default in your makeReq)
            const reqResult = await makeReq(user_ID);
            const newReqID = reqResult.insertId;

            // 2. Link the EXISTING professor to this NEW pending request
            await reqProfOnly(profID, newReqID);

            // 3. Link the EXISTING subject to this NEW pending request
            await reqSubOnly(newReqID, subjectID);

            return { 
                success: true, 
                message: "Assignment request submitted! It will appear after admin approval." 
            };
        } catch (err) {
            console.error(err);
            return fail(500, { message: "Failed to submit assignment request." });
        }
    }
};