require('dotenv').config();

module.exports = {
    client: process.env.DB_CLIENT || 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'secret',
        database: process.env.DB_NAME || 'db_name',
        charset: process.env.DB_CHARSET || 'utf8',
        collate: process.env.DB_COLLATE || 'utf8_unicode_ci',
        timezone: 'UTC'
    },
    migrations: {
        tableName: process.env.DB_MIGRATION_TABLE || 'migrations'
    },
    useNullAsDefault: true
};