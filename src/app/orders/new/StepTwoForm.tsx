'use client';
import { useState } from 'react';
import { Producto } from './types';

interface Props {
  productos: Producto[];
  productoActual: Producto;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  agregar: () => void;
  eliminar: (index: number) => void;
  onBack: () => void;
  onEnviar: () => void;
}

export default function StepTwoForm({
  productos,
  productoActual,
  onChange,
  agregar,
  eliminar,
  onBack,
  onEnviar,
}: Props) {
  const [error, setError] = useState('');

  const handleEnviar = () => {
    if (productos.length === 0) {
      setError('Debes agregar al menos un producto antes de continuar.');
      return;
    }
    setError('');
    onEnviar();
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md space-y-6">
      <h2 className="text-md font-semibold text-gray-700">Agrega tus productos</h2>

      {error && (
        <div className="text-red-600 text-sm font-medium border border-red-300 bg-red-50 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
        <input className="input-style" placeholder="Largo" name="largo" value={productoActual.largo} onChange={onChange} />
        <input className="input-style" placeholder="Alto" name="alto" value={productoActual.alto} onChange={onChange} />
        <input className="input-style" placeholder="Ancho" name="ancho" value={productoActual.ancho} onChange={onChange} />
        <input className="input-style" placeholder="Peso en libras" name="peso" value={productoActual.peso} onChange={onChange} />
        <input className="input-style md:col-span-2" placeholder="Contenido" name="contenido" value={productoActual.contenido} onChange={onChange} />
      </div>

      <button
        type="button"
        onClick={agregar}
        className="mt-2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        ➕ Agregar
      </button>

      {productos.map((p, i) => (
        <div
          key={i}
          className="border border-gray-300 rounded-md p-4 bg-green-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4"
        >
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Peso:</span> {p.peso} lbs
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Contenido:</span> {p.contenido}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Dimensiones:</span> {p.largo} × {p.ancho} × {p.alto} cm
          </div>
          <button
            onClick={() => eliminar(i)}
            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
          >
            🗑 Eliminar
          </button>
        </div>
      ))}

      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="px-6 py-2 border rounded-md hover:bg-gray-100">
          ⬅ Regresar
        </button>
        <button
          onClick={handleEnviar}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Enviar →
        </button>
      </div>
    </section>
  );
}
