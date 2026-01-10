import { NextResponse, type NextRequest } from "next/server";
import { decodeJwtToken } from "./components/helper/helper";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("refreshToken")?.value;
  const token = refreshToken ? decodeJwtToken(refreshToken) : null;

  const isLoginPage = pathname === "/" || pathname.startsWith("/login");

  const isOnboardingPage = pathname.startsWith("/onboarding");

  // 1️⃣ No token → only login allowed
  if (!refreshToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2️⃣ Token exists but onboarding NOT done
  if (refreshToken && !token?.hotelId) {
    if (!isOnboardingPage) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    return NextResponse.next();
  }

  // 3️⃣ Token exists & onboarding done → block login & onboarding
  if (refreshToken && token?.hotelId) {
    if (isLoginPage || isOnboardingPage) {
      return NextResponse.redirect(new URL("/overview", request.url));
    }
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
