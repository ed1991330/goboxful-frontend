'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    sexo: '',
    fechaNacimiento: '',
    correo: '',
    whatsapp: '',
    contrasena: '',
    repetirContrasena: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (form.contrasena !== form.repetirContrasena) {
    alert('Las contraseñas no coinciden');
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: form.nombre,
        apellido: form.apellido,
        sexo: form.sexo,
        fechaNacimiento: form.fechaNacimiento,
        correo: form.correo,
        whatsapp: `503${form.whatsapp}`, // ya incluye el 503 o puedes dejarlo como `form.whatsapp`
        password: form.contrasena,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error en el registro');
    }

    const data = await response.json();
    console.log('Registro exitoso:', data);
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    router.push('/auth/login');
  } catch (error: any) {
    console.error('Error en el registro:', error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Cuéntanos de ti</h2>
        <p className="text-sm text-gray-600 mb-6">Completa la información de registro</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Digita tu nombre"
              className="input-style"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Apellido</label>
            <input
              type="text"
              name="apellido"
              placeholder="Digita tu apellido"
              className="input-style"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Sexo</label>
            <select name="sexo" className="input-style" value={form.sexo} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              className="input-style"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              placeholder="Digitar correo"
              className="input-style"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Número de WhatsApp</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-200 text-sm rounded-l-md border border-gray-300">
                503
              </span>
              <input
                type="text"
                name="whatsapp"
                placeholder="7777 7777"
                className="w-full rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={form.whatsapp}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              placeholder="Digitar contraseña"
              className="input-style"
              value={form.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Repetir contraseña</label>
            <input
              type="password"
              name="repetirContrasena"
              placeholder="Digitar contraseña"
              className="input-style"
              value={form.repetirContrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
