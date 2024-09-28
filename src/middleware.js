import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const userRole = token?.role;
  const path = request.nextUrl.pathname;

  const isPublic = path === "/" || path === "/signup" || path === "/login";
  const adminPath = path.startsWith("/admin");
  const doctorPath = path.startsWith("/doctor");
  const userPath = path.startsWith("/user");

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    if (isPublic) {
      return NextResponse.redirect(
        new URL(userRole.toLowerCase(), request.url)
      );
    }

    // Prevent doctors from accessing admin routes
    if (adminPath && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to home or an appropriate route
    }

    // Prevent users from accessing doctor routes
    if (doctorPath && userRole !== "DOCTOR") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Prevent users from accessing user routes
    if (userPath && userRole !== "USER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (adminPath || doctorPath || userPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
