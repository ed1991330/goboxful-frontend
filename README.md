# Goboxful - Frontend

Frontend del sistema de envíos **Goboxful**, desarrollado en [Next.js](https://nextjs.org/) con autenticación mediante JWT, protección de rutas, wizard de creación de órdenes y exportación a Excel.

## 🚀 Tecnologías utilizadas

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [XLSX](https://github.com/SheetJS/sheetjs) para exportación a Excel
- [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- Context API para manejo de autenticación

## 🔐 Funcionalidades principales

- Registro y login de usuarios
- Validación de sesión con token JWT
- Redirección automática si el token expira
- Creación de órdenes en formato wizard de 2 pasos
- Validación de formularios paso a paso
- Listado histórico de órdenes
- Filtro por fecha de creación (`createdDate`)
- Exportación de órdenes seleccionadas a Excel

## 🛠️ Estructura de carpetas

```
/app
  /auth         → Pantallas de login y registro
  /dashboard    → Área protegida
  /orders       → Historial y creación de órdenes
/components     → Reutilizables (Sidebar, PageHeader, etc.)
/contexts       → AuthContext
/hooks          → useProtectedRoute
/utils          → jwtUtils (validación de token)
```

## 📦 Instalación y ejecución

Clona el proyecto y luego ejecuta:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la app.

## 🔐 Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Reemplaza la URL por la de tu backend desplegado si aplica.


## 👤 Autor

Desarrollado por **Eduardo Molina**.