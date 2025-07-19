'use client';
import { useState } from 'react';
import { OrderInfo } from './types';

interface Props {
  data: OrderInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onNext: () => void;
}

const departamentos = {
  'San Salvador': ['San Salvador', 'Soyapango', 'Mejicanos'],
  'La Libertad': ['Santa Tecla', 'Antiguo Cuscatlán', 'Colón']
};

export default function StepOneForm({ data, onChange, onNext }: Props) {
  const [error, setError] = useState('');

  const handleNext = () => {
    const camposRequeridos = [
      'direccionRecepcion',
      'fecha',
      'nombre',
      'apellido',
      'telefono',
      'correo',
      'direccionDestinatario',
      'departamento',
      'municipio'
    ];
    const camposVacios = camposRequeridos.filter(campo => !data[campo as keyof OrderInfo]);
    if (camposVacios.length > 0) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <form className="space-y-6 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-md font-semibold text-gray-700">Completa los datos</h2>

      {error && (
        <div className="text-red-600 text-sm font-medium border border-red-300 bg-red-50 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input-style" placeholder="Dirección de recepción" name="direccionRecepcion" value={data.direccionRecepcion} onChange={onChange} />
        <input className="input-style" type="date" name="fecha" value={data.fecha} onChange={onChange} />

        <input className="input-style" placeholder="Nombre" name="nombre" value={data.nombre} onChange={onChange} />
        <input className="input-style" placeholder="Apellido" name="apellido" value={data.apellido} onChange={onChange} />

        <div className="flex">
          <span className="inline-flex items-center px-3 bg-gray-200 text-sm rounded-l-md border border-gray-300">503</span>
          <input className="input-style rounded-l-none" placeholder="Teléfono" name="telefono" value={data.telefono} onChange={onChange} />
        </div>

        <input className="input-style" type="email" placeholder="Correo electrónico" name="correo" value={data.correo} onChange={onChange} />

        <input className="input-style md:col-span-2" placeholder="Dirección del destinatario" name="direccionDestinatario" value={data.direccionDestinatario} onChange={onChange} />

        <select className="input-style" name="departamento" value={data.departamento} onChange={onChange}>
          <option value="">Seleccione un departamento</option>
          {Object.keys(departamentos).map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <select className="input-style" name="municipio" value={data.municipio} onChange={onChange}>
          <option value="">Seleccione un municipio</option>
          {data.departamento && departamentos[data.departamento]?.map(mun => (
            <option key={mun} value={mun}>{mun}</option>
          ))}
        </select>

        <input className="input-style md:col-span-2" placeholder="Punto de referencia" name="puntoReferencia" value={data.puntoReferencia} onChange={onChange} />

        <textarea className="input-style md:col-span-2" rows={3} placeholder="Indicaciones" name="indicaciones" value={data.indicaciones} onChange={onChange} />
      </div>

      <div className="text-right pt-4">
        <button
          type="button"
          onClick={handleNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
        >
          Siguiente →
        </button>
      </div>
    </form>
  );
}
