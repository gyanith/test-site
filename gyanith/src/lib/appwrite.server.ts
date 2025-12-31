import { Client, Databases, Users, TablesDB } from "node-appwrite";

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

export const databases = new Databases(client);
export const tablesDB = new TablesDB(client)
export const users = new Users(client);
export { Query } from "node-appwrite";
