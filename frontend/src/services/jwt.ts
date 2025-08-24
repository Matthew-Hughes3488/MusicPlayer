import type { JWTPayload } from '../types';

export function decodeJWT(token: string): JWTPayload | null {
  try {
    // Handle demo tokens
    if (token.startsWith('demo.') && token.endsWith('.demo')) {
      const payloadPart = token.slice(5, -5); // Remove 'demo.' prefix and '.demo' suffix
      const decoded = atob(payloadPart);
      return JSON.parse(decoded) as JWTPayload;
    }
    
    // Split the JWT token
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = atob(payload);
    
    return JSON.parse(decoded) as JWTPayload;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload) {
    return true;
  }

  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
}

export function getUserIdFromToken(token: string): number | null {
  const payload = decodeJWT(token);
  if (!payload) {
    return null;
  }

  return parseInt(payload.sub);
}

export function getUserRoleFromToken(token: string): string | null {
  const payload = decodeJWT(token);
  if (!payload) {
    return null;
  }

  return payload.role;
}