"use server";

import { Client, Account, ID } from "node-appwrite";
import { cookies } from "next/headers";

function createClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  return client;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  const client = createClient();
  const account = new Account(client);

  try {
    const user = await account.create(ID.unique(), email, password, name);
    return { success: true, user };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function loginWithEmail(email: string, password: string) {
  const client = createClient();
  const account = new Account(client);

  try {
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: (error as Error).message };
  }
}
