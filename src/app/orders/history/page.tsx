'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import PageHeader from '@/app/components/PageHeader';


interface Orden {
  id: string;
  nombre: string;
  apellido: string;
  departamento: string;
  municipio: string;
  paquetes: number;
}

const ordenesMock: Orden[] = [
  {
    id: '3464788',
    nombre: 'Julio',
    apellido: 'Almendarez',
    departamento: 'San Salvador',
    municipio: 'San Salvador',
    paquetes: 4,
  },
];

export default function OrdersHistoryPage() {
  const [ordenes] = useState(ordenesMock);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
       <Sidebar></Sidebar>

      {/* Main content */}
      <main className="flex-1 p-8">
         <PageHeader  title="Mis envios" ></PageHeader>
        {/* Filtros */}
        <div className="flex items-center gap-2 mb-6">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40">
            <option>Enero - Julio</option>
          </select>
          <input type="date" className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
          <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700">Buscar</button>
          <button className="bg-gray-100 text-sm px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200">Descargar órdenes</button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-md shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead className="text-gray-700">
              <tr className="bg-gray-100 rounded">
                <th className="pl-4 py-2 font-medium">No. de orden</th>
                <th className="py-2 font-medium">Nombre</th>
                <th className="py-2 font-medium">Apellidos</th>
                <th className="py-2 font-medium">Departamento</th>
                <th className="py-2 font-medium">Municipio</th>
                <th className="py-2 font-medium text-center">Paquetes en orden</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden, index) => (
                <tr key={index} className="bg-white shadow-sm rounded-md">
                  <td className="pl-4 py-2">
                    <input type="checkbox" className="mr-2" name="orden" />
                    <span className="font-semibold">{orden.id}</span>
                  </td>
                  <td className="py-2">{orden.nombre}</td>
                  <td className="py-2">{orden.apellido}</td>
                  <td className="py-2">{orden.departamento}</td>
                  <td className="py-2">{orden.municipio}</td>
                  <td className="py-2 text-center">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {orden.paquetes}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
