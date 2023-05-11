import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const SECRET_SESSION=process.env.SECRET_SESSION;
const MONGO_DB=process.env.MONGO_DB;
const GITHUB_APP_ID=process.env.GITHUB_APP_ID;
const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET;
const PERSISTENCE = process.env.PERSISTENCE;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ADMIN_GMAIL= process.env.ADMIN_GMAIL;
const ADMIN_GMAIL_PASS=process.env.ADMIN_GMAIL_PASS;

export const options = {
    fileSystem:{
        usersFileName: 'users.json',
        productsFileName: 'products.json',
        cartsFileName: 'carts.json',
    },
    mongoDB:{
        url:MONGO_DB
    },
    github:{
        githubAppId:GITHUB_APP_ID,
        githubclientId:GITHUB_CLIENT_ID,
        githubClientSecret:GITHUB_CLIENT_SECRET
    },
    server:{
        port:PORT,
        secretSession:SECRET_SESSION,
        persistence: PERSISTENCE,
        tokenKey:TOKEN_SECRET
    },
    gmail:{
        adminGmail:ADMIN_GMAIL,
        adminGmailPass:ADMIN_GMAIL_PASS
    }
};