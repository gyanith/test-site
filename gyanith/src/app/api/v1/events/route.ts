import { NextResponse } from "next/server";
import { tablesDB, Query } from "@/lib/appwrite.server";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_EVENTS_COLLECTION_ID!;

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");

        const queries = type ? [Query.equal("type", type)] : [];


        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTION_ID,
            queries
        });

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message ?? "Failed to fetch events" },
            { status: error.code ?? 500 }
        );
    }
}
