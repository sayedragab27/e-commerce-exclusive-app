import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const protectedRoutes = [
    "/cart",
    "/checkout",
    "/change-password",
    "/allorders",
  ];
  const authRoutes = ["/login", "/register"];
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && authRoutes.includes(pathname)) {
    {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    return NextResponse.next();
  }

  // See "Matching Paths" below to learn more
}
export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/checkout",
    "/change-password",
    "/allorders",
  ],
};
