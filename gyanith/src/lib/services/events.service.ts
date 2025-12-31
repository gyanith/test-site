import { databases } from "@/lib/appwrite.server";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_EVENTS_COLLECTION_ID!;

export function getEventById(id: string) {
    return databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
    );
}

export function listEvents() {
    return databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
    );
}
