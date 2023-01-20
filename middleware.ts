import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/search/:path*',
    '/profile/:path*',
    '/library/:path*',
    '/song/:path*',
    '/artist/:path*',
    '/playlist/:path*',
    '/album/:path*',
    '/category/:path*',
  ],
};
