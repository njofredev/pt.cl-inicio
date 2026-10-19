# 🏥 Policlínico Tabancura — Portal de Inicio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-149eca?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-0070f3?style=for-the-badge&logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-Producción-2ea44f?style=for-the-badge)

<p align="center">
  <strong>Hub centralizado de aplicaciones clínicas, administrativas, herramientas de TI y documentación institucional para el equipo de Policlínico Tabancura.</strong>
</p>

[Características](#-características-principales) •
[Stack Tecnológico](#-stack-tecnológico) •
[Estructura](#-estructura-del-proyecto) •
[Instalación](#-instalación-y-uso-local) •
[Mantenimiento](#-guía-de-mantenimiento)

---

</div>

## 📌 Descripción General

**`pt.cl-inicio`** es el panel de inicio y punto de acceso unificado diseñado para el personal clínico, administrativo y de soporte de **Policlínico Tabancura**. 

Reúne en una sola interfaz moderna, rápida e intuitiva todas las herramientas de uso diario: fichas médicas electrónicas, sistemas dentales, plataformas de pago, servicios de soporte tecnológico, monitor de sistemas en tiempo real, promociones activas y artículos de procedimiento interno.

---

## ✨ Características Principales

- **🚀 Lanzador de Aplicaciones (App Hub):**
  - Acceso directo a plataformas clave como Dentalink, Medilink, Imed, Transbank, SII, Uptime Kuma y Nube Institucional.
  - Indicadores visuales de estado del servicio (*Online*, *Métricas de disponibilidad*).
  - Categorización clara: **Médica**, **Dental**, **Administrativa**, **Soporte & TI** y **APIs**.

- **🔍 Búsqueda y Filtrado Instantáneo:**
  - Buscador en tiempo real por nombre, descripción o palabras clave.
  - Pestañas con contador dinámico de elementos por categoría.
  - Modal de ayuda con la descripción detallada de cada categoría.

- **📢 Barra de Anuncios Superior (Sticky Bar):**
  - Notificaciones destacadas, anuncios de novedades y accesos rápidos a tutoriales institucionales.

- **🏷️ Gestión de Promociones:**
  - Panel lateral de promociones activas para pacientes.
  - Vista previa en modal con zoom en alta definición.
  - Botón de descarga de piezas gráficas para difusión y enlace directo a agendamiento web.

- **📅 Calendario Integrado:**
  - Widget con calendario del mes actual y visualización de días feriados oficiales en Chile.

- **📖 Centro de Protocolos y Artículos:**
  - Lectores modales interactivos para guías paso a paso (p. ej. *Validación Bono PAD Fonasa*, *Directorio de anexos y correos corporativos*, *Procedimientos de Recepción*).

- **🌓 Tema Oscuro / Claro y Estética Glassmorphism:**
  - Selector de tema con persistencia automática en `localStorage`.
  - Diseño moderno con efectos de desenfoque (*glassmorphism*), sombras suaves y micro-animaciones.
  - Interfaz 100% responsiva (optimizada para escritorio, tabletas y móviles).

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Turbopack) |
| **Librería UI** | [React 19](https://react.dev/) |
| **Lenguaje** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Iconografía** | [Lucide React](https://lucide.dev/) |
| **Estilos** | CSS Moderno (Variables CSS, Glassmorphism, temas claros/oscuros, sin dependencias externas) |
| **Empaquetador** | Turbopack de Next.js |

---

## 📁 Estructura del Proyecto

```text
pt.cl-inicio/
├── public/                     # Archivos estáticos públicos
│   ├── favicon.svg             # Favicon institucional en SVG
│   ├── favicon.ico             # Favicon de respaldo
│   ├── promociones-activas/    # Gráficas de promociones activas descargables
│   └── recepcion/              # Recursos gráficos para artículos
├── src/
│   ├── app/
│   │   ├── [slug]/             # Rutas dinámicas para artículos
│   │   │   └── page.tsx
│   │   ├── globals.css         # Sistema de diseño, tokens CSS y variables de tema
│   │   ├── layout.tsx          # Layout principal y script de hidratación de tema
│   │   └── page.tsx            # Dashboard principal, data y lógica de estados
│   ├── assets/                 # SVGs, logotipos y banners importables
│   │   ├── logo.svg
│   │   ├── owncloud.svg
│   │   └── uptime-kuma.svg
│   └── components/
│       ├── AppCard.tsx         # Componente de tarjeta para cada aplicación/artículo
│       └── CalendarWidget.tsx  # Widget de calendario con feriados
├── package.json                # Dependencias y scripts de ejecución
├── tsconfig.json               # Configuración de TypeScript
└── next.config.ts              # Configuración de Next.js
```

---

## 🚀 Instalación y Uso Local

### 1. Prerrequisitos
- [Node.js](https://nodejs.org/) v18.17.0 o superior (recomendado v20+).
- Gestor de paquetes `npm`.

### 2. Clonar el repositorio
```bash
git clone https://github.com/njofredev/pt.cl-inicio.git
cd pt.cl-inicio
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

### 5. Scripts disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo con Next.js Turbopack. |
| `npm run build` | Compila la aplicación optimizada para producción. |
| `npm run start` | Arranca el servidor de producción tras compilar. |
| `npm run lint` | Ejecuta ESLint para analizar la calidad del código. |

---

## ⚙️ Guía de Mantenimiento

### 1. Agregar o editar una aplicación
En [`src/app/page.tsx`](src/app/page.tsx), localiza el arreglo `APPS_DATA`. Puedes agregar un nuevo elemento con la siguiente estructura:

```typescript
{
  id: 20,
  name: "Nombre del Servicio",
  description: "Descripción breve y concisa de la herramienta.",
  url: "https://enlace-al-servicio.cl",
  status: "online", // 'online' | 'warning' | 'offline'
  category: "Administrativa", // 'Médica' | 'Dental' | 'Administrativa' | 'Soporte' | 'APIs'
  metric: "Activo",
  metricLabel: "Estado",
  icon: <Globe size={24} />
}
```

### 2. Publicar o retirar una promoción
En [`src/app/page.tsx`](src/app/page.tsx), gestiona la constante `PROMOTIONS_DATA`:
- **Para retirar promociones:** Mantén el arreglo vacío (`const PROMOTIONS_DATA: Promotion[] = [];`). El portal mostrará automáticamente el mensaje *"No hay promociones activas por el momento."*
- **Para activar una promoción:** Agrega un objeto a `PROMOTIONS_DATA` con su título, imagen, detalles de precios, URL de agendamiento y ruta de descarga.

---

## 📄 Licencia y Uso

Proyecto privado de uso interno para el **Policlínico Tabancura**. Todos los derechos reservados.
