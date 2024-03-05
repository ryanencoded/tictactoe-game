// config.ts
import dotenv from 'dotenv';

interface ParsedEnv {
  DB_HOST?: string;
  DB_NAME?: string;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  DB_PORT?: number;
}

export const loadEnvVariables = (): ParsedEnv => {
  const result = dotenv.config();

  if (result.error) {
    console.error('.env file could not be loaded:', result.error);
    process.exit(1);
  }

  const parsedEnv = result.parsed as ParsedEnv;
  if (parsedEnv.DB_PORT) {
    parsedEnv.DB_PORT = parseInt(parsedEnv.DB_PORT.toString(), 10);
  }

  return parsedEnv;
};

export const checkRequiredEnvVariables = (requiredVariables: Array<keyof ParsedEnv>): void => {
  const missingEnvVariables = requiredVariables.filter((variable) => !process.env[variable]);

  if (missingEnvVariables.length > 0) {
    console.error('Missing required environment variables:', missingEnvVariables.join(', '));
    process.exit(1);
  }
};

export default {
  loadEnvVariables,
  checkRequiredEnvVariables,
};;
