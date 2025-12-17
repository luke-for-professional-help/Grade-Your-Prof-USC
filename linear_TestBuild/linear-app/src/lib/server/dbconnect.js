import mysql from 'mysql2/promise';
import { DB_PASSWORD } from '$env/static/private';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'gradeyourprof',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;