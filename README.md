# 🏥 API REST - Gestión de Clínica Médica

Trabajo Final Integrador para la materia PROGRAMACIÓN 3. Este proyecto consiste en una API RESTful para la gestión de una clínica médica, incluyendo pacientes, médicos, turnos, obras sociales y reportes.

## ✨ Características Principales

- **Arquitectura por Capas:** Separación entre Enrutamiento, Controladores, Servicios y Acceso a Datos.
- **Autenticación y Autorización:** Implementado con JWT y control de accesos basado en roles (Administrador, Médico, Paciente).
- **Base de Datos:** Persistencia en MySQL utilizando transacciones y "Soft Deletes".
- **Reglas de Negocio:** Cálculo automático de costos de consultas según la obra social y aplicación de descuentos.
- **Subida de Archivos:** Gestión de fotos de perfil de médicos y pacientes usando `multer`.
- **Reportes y Estadísticas:** Generación de archivos PDF con `pdfkit.
- **Documentación Interactiva:** Todos los endpoints están documentados y se pueden probar en **Swagger**.

## 🛠️ Tecnologías Utilizadas

- **Node.js** & **Express.js**
- **MySQL**
- **JWT (jsonwebtoken)**
- **Multer**
- **Express-Validator**
- **PDFKit**
- **Swagger / OpenAPI**

## 🚀 Instalación y Ejecución

### 1. Requisitos Previos
- Node.js
- MySQL Server

### 2. Pasos para ejecutar el proyecto
1. Abrir la terminal y ejecutar la instalación de dependencias:
   ```bash
   npm install
   ```
2. **Base de Datos:** Importar el archivo SQL con el modelo de datos y el Stored Procedure de estadísticas en su gestor MySQL.
3. **Variables de Entorno:** Copiar el archivo `.env.example`, renombrarlo a `.env` y configurar las credenciales de su base de datos local y la clave secreta de JWT.
4. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

### 3. Documentación API
Una vez iniciado el servidor, se pueden probar todos los endpoints accediendo a la interfaz interactiva de Swagger en el navegador desde:
👉 `http://localhost:3000/api-docs` (Ajustar el puerto si se usa uno distinto).