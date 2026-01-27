// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for your auth cookie or token
  const token = request.cookies.get('auth-token'); 

  // List of paths that require a login
  const protectedPaths = ['/products', '/cart', '/checkout'];

  const isProtected = protectedPaths.some((path) => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // If no token, redirect them to the signup (or login) page
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  return NextResponse.next();
}

// Ensure the middleware only runs on these specific routes
export const config = {
  matcher: ['/products/:path*', '/cart/:path*', '/checkout/:path*'],
};