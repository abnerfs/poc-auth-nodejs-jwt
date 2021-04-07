import mysql from 'mysql2/promise';
import { loadStorageConfig } from '../models/storage-config';

const config = loadStorageConfig();


const pool: mysql.Pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.pass,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    database: config.database,
    multipleStatements: true
});

export const getConnection = () => pool;