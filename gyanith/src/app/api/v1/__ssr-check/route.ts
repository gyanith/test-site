export const dynamic = "force-dynamic";

export async function GET() {
    return new Response("SSR enabled");
}
