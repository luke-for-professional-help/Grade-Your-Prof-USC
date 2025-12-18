import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { error } from '@sveltejs/kit';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'gradeyourprof',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

//export default db;
export default pool;

export async function loginAccount(username, password) {
	const [acc] = await pool.query('SELECT * FROM user WHERE Username=?', [username]);
	if (!acc) throw error(404, 'User not found');
	console.log('Account: ', acc);
	console.log(acc[0].Password);
	const isValidAcc = await bcrypt.compare(password, acc[0].Password);
	return isValidAcc ? acc : false;
}

export async function findUser(user_ID) {
	const [acc] = await pool.query('SELECT * FROM user WHERE User_ID=?', [user_ID]);
	if (!acc) throw error(404, 'User not found');
	return acc;
}

export async function addAccount(username, email, password) {
	const saltRounds = 10;
	const hashedPass = await bcrypt.hash(password, saltRounds);
	const [acc] = await pool.query(
		'INSERT INTO `user`(`Email`, `Password`, `isModerator`, `isAdmin`, `Status_ID`, `Username`) VALUES(?, ?, 0, 0, 1, ?)',
		[email, hashedPass, username]
	);
	return acc;
}
