import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Getting user token
  const token = request.cookies.get('tkn');
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // Redirecting user to home page route if not authenticated
  if (
    (request.nextUrl.pathname == '/' || request.nextUrl.pathname.includes('campaigns')) &&
    !token
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
