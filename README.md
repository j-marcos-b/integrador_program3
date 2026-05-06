# API Clínica Médica

Este es el trabajo final integrador para la gestión una clínica médica.

## Requisitos Previos
- Node.js instalado
- MySQL instalado y corriendo localmente

## Pasos para ejecutar el proyecto

1. **Instalar dependencias:**
   Ejecutar el comando `npm install` en la terminal.

2. **Configurar Base de Datos:**
   Importar el archivo SQL con el modelo de datos en tu gestor MySQL local.

3. **Variables de Entorno:**
   Hacer una copia del archivo `.env.example`, renombrarla a `.env` y completar allí tu usuario y contraseña de MySQL.

4. **Iniciar el servidor:**
   - Para producción: `npm start`
   - Para desarrollo (se reinicia solo al guardar): `npm run dev`