import { makeReq, reqProfOnly, addProfessor, reqSubOnly, addSubject } from '$lib/server/dbconnect';
import { redirect } from '@sveltejs/kit';
export async function load({ url }) {
	const profID = url.searchParams.get('prof_ID'); // Get it from URL
	return { profID }; // Pass it to the page
}

export const actions = {
	addProf: async ({ request, url, cookies }) => {
		//first we need to add the data to prof
		//after that, insert data in request and professorInfo
		const formData = await request.formData();
		const profName = formData.get('profName');
		const file = formData.get('profImg');
		const profImg = file?.name || 'No file uploaded';
		console.log(profImg);
		const prof = await addProfessor(profName, profImg);
		const newProfID = prof.insertId;
		console.log('newProfID: ', newProfID);

		const req = await makeReq(cookies.get('User_ID'));
		const newRequestID = req.insertId;
		console.log('newReqId: ', newRequestID);

		const reqProf = await reqProfOnly(newProfID, newRequestID);

		return { success: true };
	},
	addSub: async ({ request, url, cookies }) => {
		let route;
		//first we need to insert data into subject
		//then we check for 2 conditions
		//if theres a prof_ID in the url
		//then we insert data in request, professorInfo, and subjectInfo
		//else, we just insert data in request, and subjectInfo

		const formData = await request.formData();
		const subCode = formData.get('subCode');
		const subName = formData.get('subName');
		const sub = await addSubject(subCode, subName);
		const newSubID = sub.insertId;

		const profID = url.searchParams.get('prof_ID');

		const req = await makeReq(cookies.get('User_ID'));
		const newRequestID = req.insertId;
		console.log(newRequestID);
		console.log('ProfID: ', profID);
		if (profID > 0) {
			const reqProf = await reqProfOnly(profID, newRequestID);
			console.log('ProfID: ', profID);
			route = `/professor-profile/${profID}`;
		} else {
			route = `/`;
		}
		const reqSub = await reqSubOnly(newRequestID, newSubID);
		throw redirect(303, route);
		return { success: true };
	}
};
