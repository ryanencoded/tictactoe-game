import { DataSource } from 'typeorm';
import { loadEnvVariables, checkRequiredEnvVariables } from "@config/environment";

import { Player } from '@entities/Player';

const parsedEnv = loadEnvVariables();
const requiredEnvVariables: Array<keyof typeof parsedEnv> = ['DB_HOST', 'DB_NAME', 'DB_USERNAME', 'DB_PASSWORD', 'DB_PORT'];
checkRequiredEnvVariables(requiredEnvVariables);

const dbHost: string = parsedEnv.DB_HOST!;
const dbName: string = parsedEnv.DB_NAME!;
const dbUsername: string = parsedEnv.DB_USERNAME!;
const dbPassword: string = parsedEnv.DB_PASSWORD!;
const dbPort: number = parsedEnv.DB_PORT!;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    entities: [Player],
    synchronize: true,
    logging: false,
})

export default AppDataSource