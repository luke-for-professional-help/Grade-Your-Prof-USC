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

export async function getTeacherWithSubs(profID) {
	const [teacher] = await pool.query(
		`SELECT
    p.Prof_ID,
    p.Professor_Name,
    p.Professor_img,
    s.Subject_ID,
    s.Subject_Code,
    s.Subject_Name
FROM professor p
INNER JOIN professorinfo pi ON p.Prof_ID = pi.Prof_ID
INNER JOIN request r ON pi.Request_ID = r.Request_ID
INNER JOIN subjectinfo si ON r.Request_ID = si.Request_ID
INNER JOIN subject s ON si.Subject_ID = s.Subject_ID
WHERE p.Prof_ID = ?
  AND r.Status_ID = 2 -- Strictly filter for approved requests
ORDER BY s.Subject_Code;`,
		[profID]
	);
	return teacher;
}

export async function getSearchResults(searchInput) {
	const [results] = await pool.query(
		`
        SELECT
            p.Prof_ID,
            p.Professor_Name,
            p.Professor_img,
            GROUP_CONCAT(
                DISTINCT CONCAT(s.Subject_Code, ' - ', s.Subject_Name)
                ORDER BY s.Subject_Code
                SEPARATOR ', '
            ) AS Subjects
            FROM Professor p
            INNER JOIN ProfessorInfo pi
                ON p.Prof_ID = pi.Prof_ID
            INNER JOIN Request r
                ON pi.Request_ID = r.Request_ID
                AND r.Status_ID = 2
            INNER JOIN SubjectInfo si
                ON r.Request_ID = si.Request_ID
            INNER JOIN Subject s
                ON si.Subject_ID = s.Subject_ID
            GROUP BY
                p.Prof_ID,
                p.Professor_Name,
                p.Professor_img
            HAVING
                p.Professor_Name LIKE CONCAT('%', ?, '%')
                OR Subjects LIKE CONCAT('%', ?, '%')
            ORDER BY
                p.Professor_Name;
    `,
		[searchInput, searchInput]
	);
	return results;
}

export async function getApprovedReviews(profId) {
	const [reviews] = await pool.query(
		`
    SELECT 
    rev.*,
    s.Subject_Code,
    s.Subject_Name
    FROM professor p
    INNER JOIN review rev ON p.Prof_ID = rev.Prof_ID
    INNER JOIN subject s ON rev.Subject_ID = s.Subject_ID -- The join
    WHERE p.Prof_ID = ?
    AND rev.Status_ID = 2;
    `,
		[profId]
	);

	// The [profId] array replaces the '?' in the query safely
	if (!reviews) error(404);
	return reviews;
}

export async function getAllProfessors() {
	const [profs] = await pool.query('SELECT * FROM professor');
	if (!profs) error(404);
	return profs;
}
