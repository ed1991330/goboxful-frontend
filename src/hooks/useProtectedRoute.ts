'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { isTokenExpired } from '@/utils/jwtUtils';

export function useProtectedRoute() {
  const { token, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ⏳ Esperar que termine de cargar
    if (!token || isTokenExpired(token)) {
      logout();
      router.push('/auth/login');
    }
  }, [token, loading, logout, router]);
}
