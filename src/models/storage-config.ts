export type StorageConfig = {
    host: string;
    user: string;
    pass: string;
    port?: number;
    database: string;
}

export const loadStorageConfig = (): StorageConfig => {
    const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_DATABASE } = process.env;

    if (!DB_DATABASE)
        throw new Error("loadStorageConfig - invalid DB_DATABASE variable");

    if (!DB_HOST)
        throw new Error("loadStorageConfig - invalid DB_HOST variable");

    if (!DB_USER)
        throw new Error("loadStorageConfig - invalid DB_USER variable");

    if (!DB_PASS)
        throw new Error("loadStorageConfig - invalid DB_PASS variable");

    let port: number | undefined = undefined;
    if (DB_PORT) {
        try {
            port = parseInt(DB_PORT);
        }
        catch (err) {
            throw new Error("loadStorageConfig - invalid DB_PORT variable");
        }
    }

    return {
        host: DB_HOST,
        user: DB_USER,
        pass: DB_PASS,
        port,
        database: DB_DATABASE
    }
}