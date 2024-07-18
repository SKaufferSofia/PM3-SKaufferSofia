import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT || "5432");
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "159753";
export const DB_NAME = process.env.DB_NAME || "module3_project";

export const EMAIL_USER = process.env.EMAIL_USER || "email@example.com";
export const EMAIL_PASS = process.env.EMAIL_PASS || "contraseña123";
