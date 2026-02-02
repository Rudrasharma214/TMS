import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || 'tms_db',
    DB_USER: process.env.DB_USER || 'tms_user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'tms_password',

    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

    EMAIL_VERIFY_SECRET: process.env.EMAIL_VERIFY_SECRET || 'your_email_verify_secret',
};

export default env;