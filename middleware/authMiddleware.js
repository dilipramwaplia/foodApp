/**
 * Authentication middleware for protecting routes
 */

import { NextResponse } from 'next/server';

export function authMiddleware(request) {
  // Get token from cookies or headers
  const token = request.cookies.get('authToken')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Define protected routes
  const protectedRoutes = [
    '/account/profile',
    '/account/orders',
    '/checkout',
    '/admin'
  ];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // If route is protected and no token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/account/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and trying to access auth pages, redirect to home
  const authPages = ['/account/login', '/account/signup'];
  const isAuthPage = authPages.includes(request.nextUrl.pathname);
  
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Verify JWT token (mock implementation)
export function verifyToken(token) {
  try {
    // In a real app, you would verify the JWT token here
    // For now, we'll just check if token exists and is not expired
    if (!token) return null;
    
    // Mock token verification
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Get user from token
export function getUserFromToken(token) {
  const payload = verifyToken(token);
  return payload ? payload.user : null;
}

// Check if user has required role
export function hasRole(user, requiredRole) {
  if (!user || !user.roles) return false;
  return user.roles.includes(requiredRole);
}

// Check if user has required permission
export function hasPermission(user, requiredPermission) {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(requiredPermission);
}