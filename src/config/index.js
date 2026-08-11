import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
    port: process.env.PORT || 5000,
    datadase_url: process.env.DATABASE_URL,
    jwt_access_secret: process.env.JWT_SECRET,
    jwt_refresh_secret: process.env.JWT_SECRET,
    jwt_access_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_EXPIRES_IN,
    ssl_store_id: process.env.SSL_STORE_ID,
    ssl_password: process.env.SSL_STORE_PASSWORD,
    ssl_is_live: process.env.SSL_IS_LIVE,
    backend_url: process.env.BACKEND_URL,
};
