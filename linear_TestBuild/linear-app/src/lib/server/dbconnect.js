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

export default pool;

export async function loginAccount(username, password) {
    const [rows] = await pool.query('SELECT * FROM user WHERE Username = ? LIMIT 1', [username]);
    if (!rows || rows.length === 0) return null;

    const dbUser = rows[0];

    // 1. Check for Ban Status
    if (dbUser.Ban_Time) {
        const banExpiration = new Date(dbUser.Ban_Time);
        const now = new Date();

        if (banExpiration > now) {
            // Format the date for the user (e.g., "Dec 20, 2025, 8:00 PM")
            const formattedTime = banExpiration.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            throw new Error(`You are currently banned. Your account will be opened at ${formattedTime}`);
        }
    }

    // 2. Check for Approval Status
    if (dbUser.Status_ID !== 2) {
        throw new Error('Your account is pending admin approval.');
    }

    const isValidAcc = await bcrypt.compare(password, dbUser.Password);
    if (!isValidAcc) return null;

    return {
        User_ID: dbUser.User_ID,
        Username: dbUser.Username,
        Email: dbUser.Email,
        isModerator: dbUser.isModerator,
        isAdmin: dbUser.isAdmin
    };
}

export async function addAccount(username, email, password) {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);
    
    // Status_ID 1 = Pending
    const [result] = await pool.query(
        'INSERT INTO `user`(`Email`, `Password`, `isModerator`, `isAdmin`, `Status_ID`, `Username`) VALUES(?, ?, 0, 0, 1, ?)',
        [email, hashedPass, username]
    );

	return { User_ID: result.insertId, Username: username, Email: email };
}

export async function findUser(user_ID) {
    const [rows] = await pool.query('SELECT * FROM user WHERE User_ID=?', [user_ID]);
    return rows[0] || null;
}

export async function assignSubToProf(subjectID, requestID) {
    const [result] = await pool.query(
        'INSERT INTO subjectinfo (Subject_ID, Request_ID) VALUES (?, ?)',
        [subjectID, requestID]
    );
    return result;
}

export async function getRequestIDByProf(profID) {
    const [rows] = await pool.query(
        'SELECT Request_ID FROM professorinfo WHERE Prof_ID = ? LIMIT 1',
        [profID]
    );
    return rows[0]?.Request_ID;
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

export async function getTeacherWithSubsFlattened(profID) {
	const [subs] = await pool.query(
		`SELECT
    p.Prof_ID,
    p.Professor_Name,
    p.Professor_img,
    s.Subject_ID,
    -- This combines the columns into "CODE - Name"
    CONCAT(s.Subject_Code, ' - ', s.Subject_Name) AS Full_Subject
    FROM professor p
    INNER JOIN professorinfo pi ON p.Prof_ID = pi.Prof_ID
    INNER JOIN request r ON pi.Request_ID = r.Request_ID
    INNER JOIN subjectinfo si ON r.Request_ID = si.Request_ID
    INNER JOIN subject s ON si.Subject_ID = s.Subject_ID
    WHERE (p.Prof_ID = ? OR ? IS NULL)
    AND r.Status_ID = 2
    ORDER BY s.Subject_Code;`,
		[profID, profID]
	);

	if (!subs) error(404);

	return subs;
}

export async function getAverageRating(profID) {
    const [rows] = await pool.query(
        `SELECT AVG(Rating) as avgRating, COUNT(Review_ID) as totalReviews 
         FROM review 
         WHERE Prof_ID = ? AND Status_ID = 2`, // Only count approved reviews
        [profID]
    );
    return rows[0] || { avgRating: 0, totalReviews: 0 };
}

export async function addReview(user_ID, profID, subID, date, description, studyLoad, status, rating) {
    const [result] = await pool.query(
        `INSERT INTO review (User_ID, Prof_ID, Subject_ID, Date, Description, Study_Load, Status_ID, Rating) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_ID, profID, subID, date, description, studyLoad, status, rating]
    );
    return result;
}

export async function findSub(subject) {
	const [sub] = await pool.query(
		`SELECT *
        FROM subject 
        WHERE ? LIKE CONCAT(Subject_Code, '%');`,
		[subject]
	);
	if (!sub) error(404);

	return sub;
}

export async function makeReq(userID) {
    const [req] = await pool.query(
        'INSERT INTO request (User_ID, Status_ID) VALUES (?, 1);',
        [userID]
    );
    return req;
}

export async function reqProfOnly(profID, requestID) {
	const [profReq] = await pool.query(
		`
        INSERT INTO professorinfo (Prof_ID, Request_ID) VALUES (?, ?);
        `,
		[profID, requestID]
	);

	if (!profReq) error(404);

	return profReq;
}

export async function addProfessor(profName, profImg) {
	const [prof] = await pool.query(
		`
        INSERT INTO professor (Professor_Name, Professor_img) 
        VALUES (?, ?);
        `,
		[profName, profImg]
	);
	if (!prof) error(404);

	return prof;
}

export async function addSubject(subCode, subName) {
	const [sub] = await pool.query(
		`
        INSERT INTO subject (Subject_Code, Subject_Name) 
        VALUES (?, ?);
        `,
		[subCode, subName]
	);
	if (!sub) error(404);

	return sub;
}

export async function reqSubOnly(requestID, subjectID) {
	const [sub] = await pool.query(
		`
        INSERT INTO subjectinfo (Subject_ID, Request_ID) 
        VALUES (?, ?);
        `,
		[subjectID, requestID]
	);
	if (!sub) error(404);

	return sub;
}
