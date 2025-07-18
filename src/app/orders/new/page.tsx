'use client';
import { useState } from 'react';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import { OrderInfo, Producto } from './types';
import Sidebar from '@/app/components/Sidebar';
import PageHeader from '@/app/components/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
const { user } = useAuth();

export default function CreateOrderWizard() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();

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

  const enviarOrden = () => {
    const ordenCompleta = { ...form, productos };
    console.log('Orden enviada:', ordenCompleta);
    alert('Orden enviada (simulado)');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar></Sidebar>

      <main className="flex-1 p-8">
        <PageHeader  
          title="Crear orden"
          userFullName={user ? `${user.nombre} ${user.apellido}` : undefined}
        ></PageHeader>
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
