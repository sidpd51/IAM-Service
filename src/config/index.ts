import dotenv from 'dotenv';

type ServerConfigType = {
    PORT: number;
    SALT_ROUNDS: number;
}

function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS)
};