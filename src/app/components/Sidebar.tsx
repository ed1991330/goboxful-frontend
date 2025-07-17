'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const path = usePathname();

  const linkClass = (route: string) =>
    `flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
      path.includes(route)
        ? 'bg-indigo-600 text-white font-semibold'
        : 'text-gray-700 hover:text-indigo-600'
    }`;

  return (
    <aside className="w-64 bg-white p-6 shadow-md flex flex-col">
      <div className="mb-10 text-orange-600 font-bold text-2xl">📦 boxful</div>
      <nav className="space-y-2">
        <Link href="/orders/new" className={linkClass('/orders/new')}>
          ➕ Crear orden
        </Link>
        <Link href="/orders/history" className={linkClass('/orders/history')}>
          📄 Historial
        </Link>
      </nav>
    </aside>
  );
}
