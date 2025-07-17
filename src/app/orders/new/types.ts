export interface OrderInfo {
  direccionRecepcion: string;
  fecha: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccionDestinatario: string;
  departamento: string;
  municipio: string;
  puntoReferencia: string;
  indicaciones: string;
}

export interface Producto {
  largo: string;
  alto: string;
  ancho: string;
  peso: string;
  contenido: string;
}
