'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'; // IMPORTA EL CONTEXTO


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // FUNCIÓN login DEL CONTEXTO
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        correo: form.email,        
        password: form.password,   
      }),
    });
    const text = await res.text();
    
    if (!res.ok) {
      throw new Error(text || 'Error en el login');
    }

    if (!text) {
      throw new Error('Credenciales incorrectas');
    }

    const data = JSON.parse(text); 

    if (!data || !data.access_token) {
      alert('Credenciales incorrectas');
      return;
    }

    login(data.access_token, data.user);
    router.push('/orders/new');
  } catch (err: any) {
    alert(err.message);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Bienvenido</h1>
        <p className="text-sm text-gray-600 mb-6">Por favor ingresa tus credenciales</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="*****"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          ¿Necesitas una cuenta?{' '}
          <a href="/auth/register" className="font-semibold text-indigo-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
