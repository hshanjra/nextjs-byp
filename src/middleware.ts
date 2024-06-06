import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // TODO: Handle auth
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/account/:path*"],
};
