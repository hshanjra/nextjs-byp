import { extApi } from "@/lib/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // check if token exists
    const token = cookies().get("accessToken");
    if (!token) return;
    const me = await extApi.get("/auth/me", {
      headers: { Cookie: cookies().toString() },
    });
    return Response.json(me.data);
  } catch (error: any) {
    console.error("Failed to get user:", error);
    return Response.json(error.message);
  }
}
