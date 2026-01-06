import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get("refreshToken");

  if (isLoggedIn && pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}
