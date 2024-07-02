import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = cookies().get("accessToken");
  if (!token) {
    // clear auth user
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  // TODO: check if token is valid
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/thank-you/:path*"],
};
