"use server";
import { extApi } from "@/lib/api";
import { cookies } from "next/headers";

export async function createCheckoutSession() {
  let session = cookies().get("session")?.value;

  if (!session) return { error: "No session found" };

  try {
    const { data } = await extApi.post(
      "/checkout/create-session",
      {},
      {
        headers: { cookie: `session=${session}` },
      }
    );

    const sessionId = data.sessionId;
    return { sessionId };
  } catch (e: any) {
    console.log(e);
    return { error: e.message };
  }
}

export async function validateCheckoutSession(sessionId: string) {
  let session = cookies().get("session")?.value;

  if (!session) return { error: "No session found" };

  try {
    const { data } = await extApi.post(
      `/checkout/validate-session?sessionId=${sessionId}`,
      {},
      {
        headers: { cookie: `session=${session}` },
      }
    );
    return { client_secret: data.client_secret, cart: data.cart };
  } catch (e: any) {
    console.log(e);
    return { error: e.message };
  }
}
