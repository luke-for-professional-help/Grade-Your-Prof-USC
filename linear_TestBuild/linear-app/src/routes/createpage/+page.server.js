import {
	addReview,
	getAllProfessors,
	getTeacherWithSubsFlattened,
	findSub
} from '$lib/server/dbconnect';

import { user } from '$lib/stores/user.js';
console.log('user: ', user);
export async function load({ url }) {
	const profID = (await url.searchParams.get('prof_ID')) ?? null;
	console.log('ProfIdCreate: ', profID);
	const allProfs = await getAllProfessors();
	const subsUnderProfFlattened = await getTeacherWithSubsFlattened(profID);
	return { allProfs, subsUnderProfFlattened };
}

export const actions = {
	addReview: async ({ request, url, cookies }) => {
		const profID = url.searchParams.get('prof_ID') ?? null;
		console.log('create profID: ', profID);
		const formData = await request.formData();
		const prof = formData.get('profName');
		const sub = formData.get('subName');
		const actualSub = await findSub(sub);
		const msg = formData.get('message');
		const file = formData.get('studyLoad');
		const dateForDB = new Date().toISOString().split('T')[0];
		// 2. Extract the filename string
		// We check if file exists and has a name to avoid errors if the user didn't upload anything
		const fileNameOnly = file && file.name !== 'undefined' ? file.name : 'No file uploaded';

		console.log('Saving to DB:', fileNameOnly); // Results in "my_document.pdf"
		const user_ID = cookies.get('User_ID');

		await addReview(user_ID, profID, actualSub[0].Subject_ID, dateForDB, msg, fileNameOnly, 1);
		return { success: true };
	}
};
