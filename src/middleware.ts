import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const authPages = ["/login", "/register"];
  const protectedRoutes = ["/", "/brands", "/cart", "/product", "/productdetails" , "/wish" , "/payment" , "/allorders"];

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/brands",
    "/cart",
    "/product",
    "/productdetails",
    "/wish",
    "/payment",
    "/allorders"
  ],
};
