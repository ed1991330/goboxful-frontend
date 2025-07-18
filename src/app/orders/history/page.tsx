'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar';
import PageHeader from '@/app/components/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Orden {
  id: string;
  nombres: string;
  apellidos: string;
  departamento: string;
  municipio: string;
  paquetes: number;
  createdDate: string; // 👈 nuevo campo
}

export default function OrdersHistoryPage() {
  useProtectedRoute();

  const { user, token } = useAuth();
  const [todasLasOrdenes, setTodasLasOrdenes] = useState<Orden[]>([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState<Orden[]>([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [ordenesSeleccionadas, setOrdenesSeleccionadas] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Error al cargar historial');
        }

        const data = await res.json();
        setTodasLasOrdenes(data);
        setOrdenesFiltradas(data); // inicializar
      } catch (err: any) {
        console.error('Error al cargar historial:', err);
        alert(err.message);
      }
    };

    if (token) fetchOrdenes();
  }, [token]);

  const aplicarFiltro = () => {
    if (!filtroFecha) {
      setOrdenesFiltradas(todasLasOrdenes);
    } else {
      const filtradas = todasLasOrdenes.filter(orden =>
        orden.createdDate?.startsWith(filtroFecha)
      );
      setOrdenesFiltradas(filtradas);
    }
  };

  const limpiarFiltro = () => {
    setFiltroFecha('');
    setOrdenesFiltradas(todasLasOrdenes);
  };

  const toggleSeleccion = (id: string) => {
    setOrdenesSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const exportarAExcel = () => {
    const seleccionadas = ordenesFiltradas.filter(o => ordenesSeleccionadas.includes(o.id));
    if (seleccionadas.length === 0) {
      alert('Selecciona al menos una orden');
      return;
    }

    const hoja = XLSX.utils.json_to_sheet(seleccionadas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Órdenes');

    const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'ordenes.xlsx');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <PageHeader
          title="Mis envíos"
          userFullName={user ? `${user.nombre} ${user.apellido}` : undefined}
        />

        {/* Filtros */}
        <div className="flex items-center gap-2 mb-6">
          Fecha de Creacion: 
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <button
            onClick={aplicarFiltro}
            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Buscar
          </button>
          <button
            onClick={limpiarFiltro}
            className="bg-gray-100 text-sm px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
          >
            Limpiar
          </button>
          <button
            onClick={exportarAExcel}
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700"
          >
            Descargar órdenes
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-md shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead className="text-gray-700">
              <tr className="bg-gray-100 rounded">
                <th className="pl-4 py-2 font-medium">No. de orden</th>
                <th className="py-2 font-medium">Fecha de Creacion</th>
                <th className="py-2 font-medium">Nombre</th>
                <th className="py-2 font-medium">Apellidos</th>
                <th className="py-2 font-medium">Departamento</th>
                <th className="py-2 font-medium">Municipio</th>
                <th className="py-2 font-medium text-center">Paquetes</th>
                <th className="py-2 font-medium text-center">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.map((orden, index) => (
                <tr key={index} className="bg-white shadow-sm rounded-md">
                  <td className="pl-4 py-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={ordenesSeleccionadas.includes(orden.id)}
                      onChange={() => toggleSeleccion(orden.id)}
                    />
                    <span className="font-semibold">{orden.id}</span>
                  </td>
                  <td className="py-2">{orden.createdDate}</td>
                  <td className="py-2">{orden.nombres}</td>
                  <td className="py-2">{orden.apellidos}</td>
                  <td className="py-2">{orden.departamento}</td>
                  <td className="py-2">{orden.municipio}</td>
                  <td className="py-2 text-center">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {orden.paquetes}
                    </span>
                  </td>
                  <td className="py-2 text-center text-xs text-gray-500">
                    {orden.createdDate?.substring(0, 10)}
                  </td>
                </tr>
              ))}
              {ordenesFiltradas.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-6">
                    No hay órdenes registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
