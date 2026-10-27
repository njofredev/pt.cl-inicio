require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL no definida en el entorno ni en .env.local');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const INITIAL_APPS = [
  {
    name: "https://policlinicotabancura.cl",
    description: "Nueva plataforma web institucional del Policlínico con servicios, profesionales, especialidades e información clave para pacientes.",
    url: "https://policlinicotabancura.cl",
    status: "online",
    category: "Administrativa",
    metric: "v2.0",
    metric_label: "Versión de sitio",
    icon_type: "globe",
    display_order: 1,
    help_info: {
      title: "Soporte Sitio Web Institucional",
      description: "Si el sitio web presenta lentitud o fallas en el formulario de contacto/reserva:",
      steps: [
        "Verifica primero el estado general en 'Estado de Sistemas' (Uptime Kuma).",
        "Prueba ingresando en modo incógnito para descartar caché del navegador."
      ],
      contactName: "Equipo TI Policlínico",
      contactEmail: "soporte@policlinicotabancura.cl",
      notes: "Para cambios de contenidos o actualización de profesionales, contactar a Administración."
    }
  },
  {
    name: "Estado de Sistemas",
    description: "Monitoreo en tiempo real del estado de los servidores, servicios y APIs de la institución.",
    url: "https://uptime.policlinicotabancura.cl/status/estado",
    status: "online",
    category: "Soporte",
    metric: "99.98%",
    metric_label: "Kuma Self-Hosted",
    icon_type: "uptime",
    display_order: 2,
    help_info: {
      title: "Ayuda Monitor Uptime Kuma",
      description: "Monitor de disponibilidad técnica para saber si algún servicio interno o externo está caído.",
      steps: [
        "Revisa si el servicio afectado aparece en rojo (Degradado/Caído).",
        "Si observas un servicio caído de forma prolongada, notifica de inmediato al equipo TI."
      ],
      contactName: "Mesa de Ayuda TI",
      contactPhone: "+56 9 8888 0000",
      contactEmail: "ti@policlinicotabancura.cl"
    }
  },
  {
    name: "Nube Institucional (Admin)",
    description: "Acceso y administración de la infraestructura de almacenamiento, bases de datos y credenciales de TI.",
    url: "https://admin.policlinicotabancura.cl",
    status: "online",
    category: "Soporte",
    metric: "Activo",
    metric_label: "Acceso TI",
    icon_type: "cloud",
    display_order: 3,
    help_info: {
      title: "Soporte Nube y Accesos TI",
      description: "Acceso restringido para el equipo administrativo y de sistemas.",
      steps: [
        "Si perdiste tus credenciales o el autenticador 2FA falló, solicita un restablecimiento seguro.",
        "Asegúrate de estar conectado a la red autorizada o VPN institucional."
      ],
      contactName: "Administrador de Redes & TI",
      contactEmail: "ti@policlinicotabancura.cl"
    }
  },
  {
    name: "Validador Tarjeta Mi Vita",
    description: "Plataforma de validación de beneficios y descuentos asociados a la Tarjeta Mi Vita para pacientes.",
    url: "http://mivita.policlinicotabancura.cl",
    status: "online",
    category: "Administrativa",
    metric: "Mi Vita",
    metric_label: "Convenio Municipal",
    icon_type: "credit-card",
    display_order: 4,
    help_info: {
      title: "Problemas con Tarjeta Mi Vita",
      description: "En caso de rechazo o no reconocimiento del RUT del paciente:",
      steps: [
        "Confirma que el RUT esté ingresado sin puntos y con guion.",
        "Verifica que la tarjeta Mi Vita del paciente se encuentre vigente en el portal comunal.",
        "Si el sistema no responde, reportar con el anexo de convenios o caja."
      ],
      contactName: "Convenios & Administración",
      contactPhone: "Anexo 219"
    }
  },
  {
    name: "Registro Digital Dental",
    description: "Control y seguimiento clínico de los trabajos de laboratorio dental y prótesis solicitados.",
    url: "",
    status: "online",
    category: "Médica",
    metric: "Dental",
    metric_label: "Especialidad",
    icon_type: "file-text",
    display_order: 5,
    help_info: {
      title: "Ayuda Registro Dental",
      description: "Seguimiento de órdenes y fichas de laboratorio clínico dental.",
      steps: [
        "Si no puedes registrar una orden, valida que el ID de paciente coincida con Dentalink.",
        "Comunícate con coordinación dental en caso de retraso en prótesis o trabajos externos."
      ],
      contactName: "Coordinación Dental",
      contactPhone: "Anexo 214"
    }
  },
  {
    name: "Cotizador de Exámenes",
    description: "Herramienta de cotización automatizada en línea para exámenes clínicos de laboratorio y diagnóstico.",
    url: "https://cotizador.policlinicotabancura.cl/public",
    status: "online",
    category: "Administrativa",
    metric: "En línea",
    metric_label: "Cotizaciones",
    icon_type: "calculator",
    display_order: 6,
    help_info: {
      title: "Soporte Cotizador de Exámenes",
      description: "Asistencia para cotización de exámenes de sangre, imágenes y procedimientos:",
      steps: [
        "Verifica que el código de prestación o nombre del examen esté bien escrito.",
        "Si el arancel parece desactualizado o arroja error de cálculo, notifícalo a Caja/Facturación."
      ],
      contactName: "Recepción y Aranceles",
      contactPhone: "Anexo 201"
    }
  },
  {
    name: "Portal de Derivaciones",
    description: "Módulo clínico digital para la derivación rápida y segura de pacientes a otros centros y especialistas.",
    url: "https://derivaciones.policlinicotabancura.cl",
    status: "online",
    category: "Médica",
    metric: "Derivaciones",
    metric_label: "Gestión de Pacientes",
    icon_type: "git-pull-request",
    display_order: 7,
    help_info: {
      title: "Ayuda Portal Derivaciones",
      description: "Emisión y confirmación de interconsultas y derivaciones clínicas.",
      steps: [
        "Verifica que los datos de contacto y previsión del paciente estén actualizados antes de derivar.",
        "Si el centro de destino no confirma la recepción, contacta a Enfermería Coordinadora."
      ],
      contactName: "Enfermería Coordinadora",
      contactPhone: "Anexo 210"
    }
  },
  {
    name: "API cotizador En línea",
    description: "Servicio backend para el procesamiento automatizado y cotizaciones en tiempo real del cotizador de exámenes.",
    url: "",
    status: "online",
    category: "APIs",
    metric: "API REST",
    metric_label: "Servicio Cotizador",
    icon_type: "cpu",
    display_order: 8,
    help_info: {
      title: "Soporte API Cotizador",
      description: "Servicio técnico backend. Si devuelve respuestas 500 o fallas de CORS:",
      steps: [
        "Verifica los logs en el panel de Uptime Kuma o Cloudflare.",
        "Reinicia el contenedor de la API si los timeouts persisten."
      ],
      contactName: "Desarrollo & Backend TI",
      contactEmail: "ti@policlinicotabancura.cl"
    }
  },
  {
    name: "API Cerebro",
    description: "Middleware centralizado y consola de orquestación backend del ecosistema digital del Policlínico.",
    url: "",
    status: "dev",
    category: "APIs",
    metric: "API REST",
    metric_label: "Servicio Central",
    icon_type: "cpu",
    display_order: 9,
    help_info: {
      title: "Módulo en Desarrollo (API Cerebro)",
      description: "Esta API se encuentra actualmente en fase de pruebas internas.",
      notes: "El acceso está reservado exclusivamente al equipo de desarrollo."
    }
  },
  {
    name: "Soporte Klap",
    description: "Guía paso a paso y manual de solución de problemas para el correcto funcionamiento del terminal de pagos Klap.",
    url: "/soporte-klap",
    slug: "soporte-klap",
    status: "online",
    category: "Soporte",
    metric: "Artículo",
    metric_label: "Manual de Insumos",
    is_article: true,
    icon_type: "book-open",
    display_order: 10,
    help_info: {
      title: "¿Problemas con el POS Klap?",
      description: "Si el equipo está pegado, sin papel o la transacción quedó pendiente:",
      steps: [
        "Revisa el tutorial paso a paso haciendo clic en esta tarjeta.",
        "Antes de reintentar el cobro, consulta con Administración para evitar duplicidad."
      ],
      contactName: "Andrea Palma (Admin)",
      contactPhone: "Anexo 219"
    }
  },
  {
    name: "Anexos y correos",
    description: "Listado oficial de anexos telefónicos internos, cuentas de correo corporativas y canales de comunicación.",
    url: "/anexos-y-correos",
    slug: "anexos-y-correos",
    status: "online",
    category: "Administrativa",
    metric: "Artículo",
    metric_label: "Directorio TI",
    is_article: true,
    icon_type: "book-open",
    display_order: 11,
    help_info: {
      title: "Directorio Telefónico y Correos",
      description: "Guía con todas las extensiones por piso, box y especialidad.",
      contactName: "Mesa Central",
      contactPhone: "Anexo 200 / 201",
      notes: "Para solicitar nuevas líneas o cambios de extensión, contactar a TI."
    }
  },
  {
    name: "Recepción",
    description: "Centro de información, procedimientos, protocolos y noticias de atención para el equipo de recepción.",
    url: "/recepcion",
    slug: "recepcion",
    status: "online",
    category: "Administrativa",
    metric: "Artículo",
    metric_label: "Procedimientos y Noticias",
    is_article: true,
    icon_type: "book-open",
    display_order: 12,
    help_info: {
      title: "Protocolos de Recepción",
      description: "Contiene instrucciones para bonos I-Med, bono PAD Fonasa, pagos y flujos de pacientes.",
      contactName: "Jefatura de Recepción",
      contactPhone: "Anexo 202"
    }
  },
  {
    name: "Registro de Radiología",
    description: "Control y registro de todo lo relacionado con los trabajos radiológicos de la institución.",
    url: "",
    status: "online",
    category: "Médica",
    metric: "Radiología",
    metric_label: "Especialidad",
    icon_type: "file-text",
    display_order: 13,
    help_info: {
      title: "Soporte Servicio Radiología",
      description: "Asistencia para carga de informes y radiografías dentales / médicas.",
      contactName: "Tecnólogo / Radiología",
      contactPhone: "Anexo 212"
    }
  }
];

async function seed() {
  for (const item of INITIAL_APPS) {
    await pool.query(
      `INSERT INTO portal_apps 
       (name, description, url, slug, status, category, metric, metric_label, is_article, icon_type, display_order, help_info, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)`,
      [
        item.name,
        item.description,
        item.url,
        item.slug || null,
        item.status,
        item.category,
        item.metric || null,
        item.metric_label || null,
        Boolean(item.is_article),
        item.icon_type,
        item.display_order,
        item.help_info ? JSON.stringify(item.help_info) : null,
      ]
    );
  }
  console.log('SEED COMPLETE');
  await pool.end();
}

seed().catch(err => {
  console.error(err);
  pool.end();
});
