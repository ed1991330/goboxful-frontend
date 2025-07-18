'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PageHeaderProps {
  title: string;
  userFullName?: string;
}

export default function PageHeader({ title, userFullName = '{TuNombre}' }: PageHeaderProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>{userFullName}</span>
        <button
          onClick={handleLogout}
          className="text-indigo-600 hover:underline focus:outline-none"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
