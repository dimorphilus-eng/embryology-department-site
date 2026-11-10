import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const passthrough = ["/icon", "/apple-icon", "/opengraph-image", "/twitter-image"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (passthrough.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/ru/") || pathname.startsWith("/en/") || pathname === "/ru" || pathname === "/en") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/ru" : `/ru${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|documents|.*\\..*).*)"],
};
