import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
        const decoded: any = jwtDecode(token);

        if (!decoded.id || decoded.role === 'user') {
            return NextResponse.next();
        }
        
        if (!decoded.id || decoded.role !== 'admin') {
            return NextResponse.redirect(new URL('/not-found', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error decoding token:', error);
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ['/admin/:path*','/my-account/:path*'],
    
};
