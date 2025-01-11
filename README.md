# Prueba Técnica Alegra - Imágenes del Mundo

Este proyecto es una aplicación frontend desarrollada con Vue.js que simula una competencia entre vendedores para encontrar las mejores imágenes de la web, integrándose con la API de Alegra para gestionar puntuaciones y crear facturas al finalizar la carrera.

## 🚀 Comenzando

1. **Clonar el repositorio:**

```sh
git clone https://github.com/FranciscoArenas/prueba-alegra.git
cd prueba-alegra
```

## Frontend

Este proyecto utiliza **Vue.js 3** con **Vue CLI** para crear una aplicación frontend moderna. A continuación, se detallan los pasos para la instalación y ejecución del proyecto, así como las librerías y herramientas utilizadas.

### 💻 Pasos de Instalación Frontend

Instalar las dependencias:

```sh
npm install
```

2. **Correr el proyecto en modo desarrollo:**

```sh
npm run serve
```

3. **Construir para producción:**

```sh
npm run build
```

4. **Ejecutar análisis de código (lint):**
```sh
npm run lint
```

### 📚 Librerías Frontend

- **axios**: Para realizar peticiones HTTP a la API de Alegra y Google Images.
- **tailwindcss**: Para estilos CSS utilitarios y personalizados.
- **vue-router**: Para gestionar la navegación entre páginas.
- **vuex**: Para el manejo del estado global de la aplicación.
- **eslint**: Para asegurar la calidad del código y cumplir con las buenas prácticas.

### Integraciones
**API de Alegra**
- La integración con Alegra permite:
    - Crear facturas para el vendedor ganador al final de la carrera.
    - Asociar los puntos acumulados a la factura generada.
- Autenticación: Se utiliza autenticación básica con Axios.
**API de Google Images**
- Se utiliza para buscar imágenes relacionadas con palabras clave ingresadas por el usuario.
- Configuración:
   - API Key y Custom Search Engine ID son necesarios para realizar las consultas.
- Los resultados son procesados para mostrar imágenes relevantes en la interfaz.

### 🛠️ Stack Tecnológico

 **Frontend**:
  - Vue.js 3: Framework frontend moderno y reactivo.
  - Vuex: Manejo del estado global.
  - TailwindCSS: Estilos utilitarios para un diseño profesional.
  - APIs Utilizadas:
      - Alegra API: Para la gestión de facturas.
      - Google Custom Search API: Para la búsqueda de imágenes.

### Flujo de Trabajo

1. **Inicio:**

- El usuario ingresa una palabra clave para buscar imágenes.
- Cada vendedor obtiene una imagen basada en la palabra ingresada.

2. Competencia:

- El usuario selecciona su imagen favorita entre las mostradas.
- Se asignan 3 puntos al vendedor seleccionado.

3. Ganador:

- El primer vendedor en acumular 20 puntos es declarado ganador.
- Se genera una factura en Alegra asociada al vendedor ganador y los puntos acumulados.

### 📋 Cómo probar la aplicación

Asegúrate de tener configurada una cuenta en Alegra con acceso a la API. Más detalles en la documentación de Alegra.

Ejecuta el frontend como se describe en los pasos de instalación.

Ingresa una palabra clave y simula la carrera de los vendedores.

Cuando un vendedor alcance 20 puntos, revisa la factura generada directamente en tu cuenta de Alegra.

### 🖥️ Despliegue

La aplicación está desplegada en Vercel y puede ser accedida desde el siguiente enlace:

URL de la aplicación(por determinar)

### 📧 Contacto

Para dudas o sugerencias, puedes contactarme en: francisco.arenasp@gmail.com.
