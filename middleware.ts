import { NextResponse, type NextRequest } from "next/server";
import { decodeJwtToken } from "./components/helper/helper";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get("refreshToken")?.value;
  const tokenValue = isLoggedIn ? decodeJwtToken(isLoggedIn) : "";
  console.log(tokenValue);

  if (
    isLoggedIn &&
    (pathname.includes("/login") ||
      pathname.includes("/onboarding") ||
      pathname === "/") &&
    tokenValue.hotelId
  ) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on everything EXCEPT:
    // - _next (JS, CSS)
    // - images, icons, lottie (static public assets)
    // - api (API routes)
    // - favicon
    "/((?!api|_next|images|icons|lottie|favicon.ico|sw.js|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico|json)).*)",
  ],
};
