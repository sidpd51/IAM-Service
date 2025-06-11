import dotenv from 'dotenv';
import bcrypt from 'bcrypt'


type ServerConfigType = {
    PORT: number;
    SALT_ROUNDS: string;
}

function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
    SALT_ROUNDS: bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
};