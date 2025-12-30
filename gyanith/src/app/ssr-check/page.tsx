import { createSessionClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function SSRCheckPage() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-4">SSR Auth Check</h1>
        <div className="p-6 border rounded-lg bg-green-500/10 border-green-500">
          <p className="text-green-500 font-mono">Status: Authenticated</p>
          <p className="mt-2">
            User: {user.name} ({user.email})
          </p>
          <p className="text-sm opacity-50 mt-1">ID: {user.$id}</p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-4">SSR Auth Check</h1>
        <div className="p-6 border rounded-lg bg-red-500/10 border-red-500">
          <p className="text-red-500 font-mono">Status: Not Authenticated</p>
          <p className="mt-2 text-sm">Error: {(error as Error).message}</p>
          <p className="mt-4 text-xs max-w-md">
            (Note: This is expected if you haven't logged in via a method that
            sets the 'session' cookie visible to Next.js, such as a Server
            Action)
          </p>
        </div>
      </div>
    );
  }
}
