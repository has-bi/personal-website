import { NextResponse } from "next/server";

// Indonesian is served at the root, English under /en. The app lives in src/app/[lang],
// so a root path is rewritten to /id/... internally; /id/... itself redirects to the
// root so each page has one public URL. Keep in step with DEFAULT_LOCALE in src/lib/i18n.js.
export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/id" || pathname.startsWith("/id/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/id${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

// Skip Next internals, the API and anything with a file extension (images, sitemap.xml,
// robots.txt, favicons).
export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
