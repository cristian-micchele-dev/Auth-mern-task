# MERN Auth & CRUD Task Manager

## 📝 Descripción

Esta es una aplicación web full-stack construida con el stack MERN (MongoDB, Express, React, Node.js). Permite a los usuarios registrarse, iniciar sesión y gestionar sus propias tareas a través de operaciones CRUD (Crear, Leer, Actualizar, Eliminar). La autenticación se maneja mediante JSON Web Tokens (JWT) almacenados en cookies.

## ✨ Características Principales

-   **Autenticación de Usuarios:** Sistema completo de registro e inicio de sesión.
-   **Seguridad:** Uso de JWT y cookies `httpOnly` para sesiones seguras.
-   **Rutas Protegidas:** Acceso restringido a las páginas de tareas solo para usuarios autenticados.
-   **Gestión de Tareas (CRUD):**
    -   Crear nuevas tareas.
    -   Ver todas las tareas de un usuario.
    -   Actualizar tareas existentes.
    -   Eliminar tareas.
-   **Validación de Datos:** Validación de esquemas en el backend con Zod y en el frontend con React Hook Form.
-   **Interfaz Moderna:** Diseño limpio y responsivo construido con React y Tailwind CSS.
-   **Componentes Reutilizables:** Código de frontend modularizado para fácil mantenimiento.

## 🚀 Tech Stack

### Frontend
-   **Framework:** React
-   **Bundler:** Vite
-   **Routing:** React Router
-   **Estilos:** Tailwind CSS
-   **Formularios:** React Hook Form
-   **Peticiones HTTP:** Axios

### Backend
-   **Entorno de Ejecución:** Node.js
-   **Framework:** Express
-   **Base de Datos:** MongoDB con Mongoose
-   **Autenticación:** JSON Web Token (jsonwebtoken)
-   **Validación:** Zod
-   **Middlewares:** Cookie Parser, Bcrypt.js, Morgan

## ⚙️ Instalación y Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

-   Node.js (v18 o superior)
-   npm o yarn
-   MongoDB instalado y corriendo en tu máquina, o una URI de conexión a un clúster de MongoDB Atlas.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/MERN-CRUD-AUTH.git
cd MERN-CRUD-AUTH
```

### 2. Configurar el Backend

Instala las dependencias del servidor desde la raíz del proyecto.

```bash
npm install
```

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno. Puedes usar el archivo `.env.example` como guía.

```env
# .env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/mern-tasks
TOKEN_SECRET=some_secret_key_123
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar el Frontend

Abre una nueva terminal, navega a la carpeta `client` e instala sus dependencias.

```bash
cd client
npm install
```

### 4. Ejecutar la Aplicación

-   **Iniciar el servidor (backend):** Desde la raíz del proyecto.
    ```bash
    npm run dev
    ```

-   **Iniciar el cliente (frontend):** Desde la carpeta `client`.
    ```bash
    npm run dev
    ```

El servidor se ejecutará en `http://localhost:4000` y la aplicación de React en `http://localhost:5173`.