import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";
const { auth } = NextAuth(authConfig);
const authRoutes = ["/login", "/register", "/adminregister"];
const protectedRoutes = ["/", "/doctorinfo", "/reservelist"];
const doctorinfo = ["/doctorinfo"];
export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  if (!isLoggedIn) {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return Response.redirect(new URL("/login", req.url));
    }
  } else if (authRoutes.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL("/", req.url));
  }
  if (
    isLoggedIn &&
    (req.auth?.user.role == UserRole.USER ||
      req.auth?.user.role == UserRole.ADMIN) &&
    doctorinfo.includes(req.nextUrl.pathname)
  ) {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
