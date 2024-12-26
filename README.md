# Backend Node.js + Express (YouTube Data API: videos más populares)

Este proyecto crea una estructura modular para un backend de Node.js con Express, orientado a **obtener los videos más populares** (trending) de YouTube en una región específica, utilizando la **YouTube Data API v3**.

## Estructura de carpetas

- **config/**: Carga y exporta la configuración (variables de entorno).
- **controllers/**: Lógica de los controladores (en este caso, "youtube.controller.js").
- **logs/**: Manejo de logs (ej. con Winston).
- **middleware/**: Middlewares globales (manejo de errores, etc.).
- **public/**: Archivos estáticos.
- **routes/**: Archivos de rutas (aquí "youtube.routes.js" y "index.js").
- **utils/**: Funciones de ayuda, en este caso "fetchYoutubeAPI.js" para llamar a la API de YouTube.
- **views/**: Plantillas si se usan motores de templates (opcional).
- **.env**: Variables de entorno (p.e., YOUTUBE_API_KEY).
- **app.js**: Punto de entrada principal.
- **package.json**: Dependencias y scripts.

## Uso

1. **Instala las dependencias**:
   \`\`\`bash
   npm install
   \`\`\`
   *(Si deseas hot reload, instala dev-dependency: \`npm install --save-dev nodemon\`.)*

2. **Configura tu archivo .env** con tu YouTube Data API Key:
   \`\`\`
   PORT=3001
   YOUTUBE_API_KEY=REEMPLAZA_CON_TU_LLAVE
   \`\`\`

3. **Ejecuta** la aplicación:
   \`\`\`bash
   npm run dev
   \`\`\`
   (o \`npm start\` si no usas nodemon)

4. **Prueba el endpoint de ejemplo**:
   \`\`\`bash
   GET http://localhost:3001/api/youtube/popular/US
   \`\`\`
   Esto devolverá un JSON con los videos que YouTube considera "mostPopular" en la región "US", incluyendo su "snippet" (título, descripción, etc.) y "statistics" (viewCount, likeCount, commentCount).

¡Listo! Con esto tienes un backend básico para consultar los videos más populares de YouTube por región.
