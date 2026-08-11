

import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });


export default {
    port: process.env.PORT || 5000,
    datadase_url: process.env.DATABASE_URL,
    frontend_url: process.env.FRONTEND_URL,
    jwt_access_secret: process.env.JWT_SECRET as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_access_expires_in: process.env.JWT_EXPIRES_IN as string,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,

    ssl_store_id: process.env.SSL_STORE_ID,
    ssl_password: process.env.SSL_STORE_PASSWORD,
    ssl_is_live: process.env.SSL_IS_LIVE,
    backend_url: process.env.BACKEND_URL,


};