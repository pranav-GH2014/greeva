import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // 1. Initialize Supabase Client in Middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // 2. Check if the user is logged in
    const { data: { user } } = await supabase.auth.getUser()

    // 3. Define Protected Routes
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/products') || 
                             request.nextUrl.pathname.startsWith('/cart') || 
                             request.nextUrl.pathname.startsWith('/checkout')

    // 4. Redirect Logic
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return supabaseResponse
  } catch (err) {
    // If you are missing environment variables on Vercel, it throws here.
    // Instead of crashing the frontend with a 500 error, we return NextResponse.next()
    // but the protected routes won't work correctly until env vars are set.
    console.error('Middleware Supabase Error:', err)
    
    // Safely fallback to allowing the request, or you could redirect to an error page.
    // We'll redirect to login if it's a protected route, or just continue.
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/products') || 
                             request.nextUrl.pathname.startsWith('/cart') || 
                             request.nextUrl.pathname.startsWith('/checkout')
    if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: ['/products/:path*', '/cart/:path*', '/checkout/:path*'],
}