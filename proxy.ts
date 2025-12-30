import { NextResponse, type NextRequest } from "next/server";
import { JWTProvider } from "./components/lib/jwt-provider";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userDetails = JWTProvider.getAccessToken();
  console.log(JWTProvider);
  const isLoggedIn = request.cookies.get("refreshToken");

  if (isLoggedIn && pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}
