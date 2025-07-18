'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import { OrderInfo, Producto } from './types';
import Sidebar from '@/app/components/Sidebar';
import PageHeader from '@/app/components/PageHeader';

export default function CreateOrderWizard() {
  useProtectedRoute(); // ✅ protege la ruta

  const [step, setStep] = useState(1);
  const { user, token } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<OrderInfo>({
    direccionRecepcion: '',
    fecha: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccionDestinatario: '',
    departamento: '',
    municipio: '',
    puntoReferencia: '',
    indicaciones: '',
  });

  const [productoActual, setProductoActual] = useState<Producto>({
    largo: '',
    alto: '',
    ancho: '',
    peso: '',
    contenido: '',
  });

  const [productos, setProductos] = useState<Producto[]>([]);

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeProducto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductoActual({ ...productoActual, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {
    if (Object.values(productoActual).some(v => v.trim() === '')) return;
    setProductos([...productos, productoActual]);
    setProductoActual({ largo: '', alto: '', ancho: '', peso: '', contenido: '' });
  };

  const eliminarProducto = (index: number) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const enviarOrden = async () => {
    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const payload = {
      direccionRecoleccion: form.direccionRecepcion,
      fechaProgramada: form.fecha,
      nombres: form.nombre,
      apellidos: form.apellido,
      correoElectronico: form.correo,
      telefono: form.telefono,
      direccionDestinatario: form.direccionDestinatario,
      departamento: form.departamento,
      municipio: form.municipio,
      puntoReferencia: form.puntoReferencia,
      indicaciones: form.indicaciones,
      productos: productos.map(p => ({
        largo: Number(p.largo),
        alto: Number(p.alto),
        ancho: Number(p.ancho),
        pesoLibras: `${p.peso} libras`,
        contenido: p.contenido,
      })),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error al crear la orden');
      }

      const data = await res.json();
      console.log('Orden enviada:', data);
      alert('¡Orden enviada exitosamente!');

      setForm({
        direccionRecepcion: '',
        fecha: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccionDestinatario: '',
        departamento: '',
        municipio: '',
        puntoReferencia: '',
        indicaciones: '',
      });

      setProductos([]);
      setProductoActual({ largo: '', alto: '', ancho: '', peso: '', contenido: '' });
      setStep(1);
    } catch (error: any) {
      console.error('Error al enviar orden:', error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <PageHeader
          title="Crear orden"
          userFullName={user ? `${user.nombre} ${user.apellido}` : undefined}
        />
        <p className="text-sm text-gray-600 mb-6">Paso {step} de 2</p>

        {step === 1 && (
          <StepOneForm data={form} onChange={onChangeForm} onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <StepTwoForm
            productos={productos}
            productoActual={productoActual}
            onChange={onChangeProducto}
            agregar={agregarProducto}
            eliminar={eliminarProducto}
            onBack={() => setStep(1)}
            onEnviar={enviarOrden}
          />
        )}
      </main>
    </div>
  );
}
