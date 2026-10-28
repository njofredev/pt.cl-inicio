'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Globe,
  Activity,
  Cloud,
  CreditCard,
  FileText,
  Calculator,
  GitPullRequest,
  Search,
  Sun,
  Moon,
  LayoutGrid,
  Stethoscope,
  Briefcase,
  Wrench,
  Cpu,
  Tag,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  X,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  Info,
  AlertTriangle,
  Ticket
} from 'lucide-react';
import AppCard, { HelpInfo } from '@/components/AppCard';
import CalendarWidget from '@/components/CalendarWidget';
import logo from '../assets/logo.svg';
import uptimeKumaLogo from '../assets/uptime-kuma.svg';
import owncloudLogo from '../assets/owncloud.svg';
import promoOrtodoncia from '../assets/promociones-activas/promoOrtodoncia.jpg';
import promoLimpieza from '../assets/promociones-activas/promoLimpieza.png';
import promocionOrtodonciaAgosto from '../assets/promociones-activas/promocionOrtodonciaAgosto.jpg';
import promocionLimpiezaSeptiembre from '../assets/promociones-activas/PromocionLimpiezaSeptiembre.png';
import promocionLimpiezaOct from '../assets/promociones-activas/PromocionLimpiezaOct.jpg';

interface Promotion {
  id: string;
  badge?: string;
  title: string;
  image: any;
  imageDownloadPath: string;
  downloadFilename: string;
  includes: string[];
  priceOld: string;
  priceCurrent: string;
  scheduleUrl: string;
  footerText: string;
}

const PROMOTIONS_DATA: Promotion[] = [
  {
    id: 'limpieza-octubre',
    badge: 'Nueva Promoción',
    title: 'Limpieza Dental',
    image: promocionLimpiezaOct,
    imageDownloadPath: '/promociones-activas/PromocionLimpiezaOct.jpg',
    downloadFilename: 'Promo_Limpieza_Octubre_Tabancura.jpg',
    includes: [
      'Evaluación Dental',
      'Limpieza Profilaxis',
      'RX Bitewing Bilateral'
    ],
    priceOld: '47.000',
    priceCurrent: '24.000',
    scheduleUrl: 'https://ff.healthatom.io/TReFqg',
    footerText: '* Promoción para personas sobre 15 años. Sujeto a evaluación clínica. Sólo pago vía web. Promoción válida hasta el 31 de Octubre del 2026. Promoción excluye pacientes con Diagnóstico de Periodontitis.'
  }
];

const Tooth = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4c-2 0-3.5-.5-4.5-.5A3.5 3.5 0 0 0 4 7c0 3 1.5 6 2.5 7.5L7 16v2a3 3 0 0 0 3 3c1 0 1.5-.8 1.5-1.5v-3c0-.8.5-1.5 1.5-1.5s1.5.7 1.5 1.5v3c0 .7.5 1.5 1.5 1.5a3 3 0 0 0 3-3v-2l.5-1.5c1-1.5 2.5-4.5 2.5-7.5a3.5 3.5 0 0 0-3.5-3.5c-1 0-2.5.5-4.5.5Z" />
  </svg>
);

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const APPS_DATA: Array<{
  id: number;
  name: string;
  description: string;
  url?: string;
  slug?: string;
  status: 'online' | 'maintenance' | 'offline' | 'dev';
  category: string;
  metric?: string;
  metricLabel?: string;
  icon?: React.ReactNode;
  isArticle?: boolean;
  helpInfo?: HelpInfo;
}> = [
  {
    id: 1,
    name: "https://policlinicotabancura.cl",
    description: "Nueva plataforma web institucional del Policlínico con servicios, profesionales, especialidades e información clave para pacientes.",
    url: "https://policlinicotabancura.cl",
    status: "online" as const,
    category: "Administrativa",
    metric: "v2.0",
    metricLabel: "Versión de sitio",
    icon: <Globe size={24} />,
    helpInfo: {
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
    id: 2,
    name: "Estado de Sistemas",
    description: "Monitoreo en tiempo real del estado de los servidores, servicios y APIs de la institución.",
    url: "https://uptime.policlinicotabancura.cl/status/estado",
    status: "online" as const,
    category: "Soporte",
    metric: "99.98%",
    metricLabel: "Kuma Self-Hosted",
    icon: <Image src={uptimeKumaLogo} alt="Uptime Kuma" width={24} height={24} style={{ objectFit: 'contain' }} />,
    helpInfo: {
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
    id: 3,
    name: "Nube Institucional (Admin)",
    description: "Acceso y administración de la infraestructura de almacenamiento, bases de datos y credenciales de TI.",
    url: "https://admin.policlinicotabancura.cl",
    status: "online" as const,
    category: "Soporte",
    metric: "Activo",
    metricLabel: "Acceso TI",
    icon: <Cloud size={24} />,
    helpInfo: {
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
    id: 4,
    name: "Validador Tarjeta Mi Vita",
    description: "Plataforma de validación de beneficios y descuentos asociados a la Tarjeta Mi Vita para pacientes.",
    url: "http://mivita.policlinicotabancura.cl",
    status: "online" as const,
    category: "Administrativa",
    metric: "Mi Vita",
    metricLabel: "Convenio Municipal",
    icon: <CreditCard size={24} />,
    helpInfo: {
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
    id: 5,
    name: "Registro Digital Dental",
    description: "Control y seguimiento clínico de los trabajos de laboratorio dental y prótesis solicitados.",
    status: "online" as const,
    category: "Médica",
    metric: "Dental",
    metricLabel: "Especialidad",
    icon: <FileText size={24} />,
    helpInfo: {
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
    id: 6,
    name: "Cotizador de Exámenes",
    description: "Herramienta de cotización automatizada en línea para exámenes clínicos de laboratorio y diagnóstico.",
    url: "https://cotizador.policlinicotabancura.cl/public",
    status: "online" as const,
    category: "Administrativa",
    metric: "En línea",
    metricLabel: "Cotizaciones",
    icon: <Calculator size={24} />,
    helpInfo: {
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
    id: 7,
    name: "Portal de Derivaciones",
    description: "Módulo clínico digital para la derivación rápida y segura de pacientes a otros centros y especialistas.",
    url: "https://derivaciones.policlinicotabancura.cl",
    status: "online" as const,
    category: "Médica",
    metric: "Derivaciones",
    metricLabel: "Gestión de Pacientes",
    icon: <GitPullRequest size={24} />,
    helpInfo: {
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
    id: 9,
    name: "API cotizador En línea",
    description: "Servicio backend para el procesamiento automatizado y cotizaciones en tiempo real del cotizador de exámenes.",
    status: "online" as const,
    category: "APIs",
    metric: "API REST",
    metricLabel: "Servicio Cotizador",
    icon: <Cpu size={24} />,
    helpInfo: {
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
    id: 10,
    name: "API Cerebro",
    description: "Middleware centralizado y consola de orquestación backend del ecosistema digital del Policlínico.",
    status: "dev" as const,
    category: "APIs",
    metric: "API REST",
    metricLabel: "Servicio Central",
    icon: <Cpu size={24} />,
    helpInfo: {
      title: "Módulo en Desarrollo (API Cerebro)",
      description: "Esta API se encuentra actualmente en fase de pruebas internas.",
      notes: "El acceso está reservado exclusivamente al equipo de desarrollo."
    }
  },
  {
    id: 11,
    name: "Soporte Klap",
    description: "Guía paso a paso y manual de solución de problemas para el correcto funcionamiento del terminal de pagos Klap.",
    url: "/soporte-klap",
    slug: "soporte-klap",
    status: "online" as const,
    category: "Soporte",
    metric: "Artículo",
    metricLabel: "Manual de Insumos",
    icon: <BookOpen size={24} />,
    isArticle: true,
    helpInfo: {
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
    id: 12,
    name: "Anexos y correos",
    description: "Listado oficial de anexos telefónicos internos, cuentas de correo corporativas y canales de comunicación.",
    url: "/anexos-y-correos",
    slug: "anexos-y-correos",
    status: "online" as const,
    category: "Administrativa",
    metric: "Artículo",
    metricLabel: "Directorio TI",
    icon: <BookOpen size={24} />,
    isArticle: true,
    helpInfo: {
      title: "Directorio Telefónico y Correos",
      description: "Guía con todas las extensiones por piso, box y especialidad.",
      contactName: "Mesa Central",
      contactPhone: "Anexo 200 / 201",
      notes: "Para solicitar nuevas líneas o cambios de extensión, contactar a TI."
    }
  },
  {
    id: 14,
    name: "Recepción",
    description: "Centro de información, procedimientos, protocolos y noticias de atención para el equipo de recepción.",
    url: "/recepcion",
    slug: "recepcion",
    status: "online" as const,
    category: "Administrativa",
    metric: "Artículo",
    metricLabel: "Procedimientos y Noticias",
    icon: <BookOpen size={24} />,
    isArticle: true,
    helpInfo: {
      title: "Protocolos de Recepción",
      description: "Contiene instrucciones para bonos I-Med, bono PAD Fonasa, pagos y flujos de pacientes.",
      contactName: "Jefatura de Recepción",
      contactPhone: "Anexo 202"
    }
  },
  {
    id: 13,
    name: "Registro de Radiología",
    description: "Control y registro de todo lo relacionado con los trabajos radiológicos de la institución.",
    status: "online" as const,
    category: "Médica",
    metric: "Radiología",
    metricLabel: "Especialidad",
    icon: <FileText size={24} />,
    helpInfo: {
      title: "Soporte Servicio Radiología",
      description: "Asistencia para carga de informes y radiografías dentales / médicas.",
      contactName: "Tecnólogo / Radiología",
      contactPhone: "Anexo 212"
    }
  },
  {
    id: 15,
    name: "Gestión de Tickets TI",
    description: "Plataforma oficial para la creación, seguimiento y resolución de requerimientos y tickets de soporte TI.",
    url: "https://gestion.policlinicotabancura.cl/ticket",
    status: "online" as const,
    category: "Soporte",
    metric: "Tickets",
    metricLabel: "Mesa de Ayuda",
    icon: <Ticket size={24} />,
    helpInfo: {
      title: "Mesa de Ayuda y Tickets TI",
      description: "Canal oficial para solicitar asistencia técnica, soporte de sistemas, redes, telefonía o periféricos.",
      steps: [
        "Ingresa a la plataforma con tu cuenta institucional o genera un nuevo requerimiento.",
        "Detalla con claridad la incidencia o necesidad, equipo afectado y piso/box de atención.",
        "Podrás revisar el estado y las respuestas de TI en tiempo real."
      ],
      contactName: "Soporte TI",
      contactEmail: "ti@policlinicotabancura.cl",
      contactPhone: "Anexo 104"
    }
  }
];

interface KlapStep {
  id: number;
  title: string;
  desc: string;
  img?: string;
  isInfo?: boolean;
  instructions: string[];
}

const klapTutorialSteps: KlapStep[] = [
  {
    id: 1,
    isInfo: true,
    title: "Validación de Transacción Pendiente",
    desc: "Antes de proceder, verifica con Administración el estado real del cobro en la plataforma de Klap.",
    instructions: [
      "Contacta a Andrea Palma (Encargada de Administración - Anexo 219) para revisar en el portal web de Klap si la transacción fue aprobada o rechazada.",
      "Si la transacción ya se confirmó o rechazó en la plataforma pero el equipo quedó bloqueado en pantalla, procede a realizar los siguientes pasos técnicos.",
      "No intentes pasar la tarjeta nuevamente hasta completar este procedimiento para evitar cobros duplicados."
    ]
  },
  {
    id: 2,
    title: "Desbloqueo del Terminal POS",
    desc: "Presiona el botón lateral de encendido o bloqueo para activar e ingresar a la pantalla principal.",
    img: "/klap/1.jpg",
    instructions: [
      "Presiona el botón físico de encendido/bloqueo en el lateral del equipo POS.",
      "Desliza la pantalla hacia arriba o presiona para desbloquear el dispositivo.",
      "Asegúrate de que la pantalla responda correctamente y muestre la hora y barra de estado."
    ]
  },
  {
    id: 3,
    title: "Acceso al Menú del Sistema",
    desc: "Ingresa a los ajustes del sistema operativo Android desde el menú principal del POS.",
    img: "/klap/2.jpg",
    instructions: [
      "Navega a la pantalla del menú técnico/sistema.",
      "Selecciona el ícono de Configuración o Ajustes (ícono de engranaje).",
      "Verifica que tengas acceso a las opciones del sistema del POS."
    ]
  },
  {
    id: 4,
    title: "Selección de Apps y Notificaciones",
    desc: "Busca y selecciona la opción de administración de aplicaciones en la lista de ajustes.",
    img: "/klap/3.jpg",
    instructions: [
      "Dentro del menú de Configuración, desplázate hasta encontrar la opción Apps y Notificaciones.",
      "Presiona sobre la opción para desplegar las preferencias de aplicaciones."
    ]
  },
  {
    id: 5,
    title: "Despliegue Total de Aplicaciones",
    desc: "Haz clic en \"Ver todas las aplicaciones\" para mostrar el listado completo de servicios del POS.",
    img: "/klap/4.jpg",
    instructions: [
      "Selecciona la opción \"Ver todas las 18 apps\".",
      "Se abrirá el listado general con todos los componentes del terminal."
    ]
  },
  {
    id: 6,
    title: "Búsqueda de Aplicaciones Klap",
    desc: "Desplázate hacia la parte inferior del listado para ubicar las aplicaciones del sistema Klap.",
    img: "/klap/5.jpg",
    instructions: [
      "Desliza con el dedo hacia el fondo de la lista de aplicaciones.",
      "Las aplicaciones del terminal se encuentran ordenadas alfabéticamente o al final del listado."
    ]
  },
  {
    id: 7,
    title: "Identificación de Apps Críticas",
    desc: "Ubica las tres aplicaciones claves del terminal.",
    img: "/klap/6.jpg",
    instructions: [
      "Localiza específicamente los siguientes tres nombres en la lista: Klap Integrador, Klap Multipago POS y Smart Pago MC.",
      "Deberás realizar la limpieza de datos/caché en cada una de ellas secuencialmente."
    ]
  },
  {
    id: 8,
    title: "Limpieza de Caché y Datos",
    desc: "Ingresa a Almacenamiento en cada app y presiona \"Borrar memoria caché\" y \"Borrar almacenamiento.\"",
    img: "/klap/7.jpg",
    instructions: [
      "Selecciona la primera app de la lista (Klap Integrador).",
      "Ingresa a la sección de \"Almacenamiento y Caché\".",
      "Presiona \"Borrar memoria caché\" y luego \"Borrar almacenamiento\" (o liberar espacio).",
      "Repite este exacto procedimiento para Klap Multipago POS y Smart Pago MC."
    ]
  },
  {
    id: 9,
    title: "Reinicio y Verificación del Terminal",
    desc: "Reinicia el POS Klap para aplicar los cambios y confirma que el error haya desaparecido.",
    img: "/klap/8.jpg",
    instructions: [
      "Mantén presionado el botón físico de encendido y selecciona la opción \"Reiniciar\".",
      "Una vez encendido el equipo, abre nuevamente la aplicación de cobro Klap.",
      "Verifica que el mensaje de \"Reversa Pendiente\" haya desaparecido y el POS quede disponible para operar normalmente."
    ]
  },
  {
    id: 10,
    title: "Confirmación y Prueba de Cobro",
    desc: "Realiza una prueba final y confirma que el terminal de pagos está 100% operativo.",
    img: "/klap/9.jpg",
    instructions: [
      "Confirma que la pantalla de inicio de Klap cargue correctamente.",
      "De ser necesario, realiza una transacción de prueba por $1 peso para validar la comunicación con el servidor.",
      "Si el equipo vuelve a mostrar un mensaje de error, contacta a Soporte TI (Anexo 222)."
    ]
  }
];

interface RecepcionPoint {
  num: number;
  title: string;
  desc: string;
}

interface RecepcionStepItem {
  stepNumber: number;
  title: string;
  description: string;
  image?: string;
  points?: RecepcionPoint[];
}

interface RecepcionNewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Procedimiento' | 'Protocolo' | 'Aviso' | 'Capacitación';
  badge?: string;
  author: string;
  summary: string;
  tutorialSteps?: RecepcionStepItem[];
  importantNote?: string;
}

const INITIAL_RECEPCION_NEWS: RecepcionNewsItem[] = [
  {
    id: '1',
    title: '¿Cómo ingresar un bono PAD en Policlínico Tabancura?',
    date: '05 de Agosto, 2026',
    category: 'Procedimiento',
    badge: 'Nuevo aviso',
    author: 'Recepción Central',
    summary: 'Tutorial paso a paso con respaldo gráfico para la validación Fonasa e ingreso de cobro en Dentalink.',
    tutorialSteps: [
      {
        stepNumber: 1,
        title: 'Validar el bono en portal Fonasa',
        description: 'Solicitar la cédula de identidad y el documento del Bono PAD (físico o digital) para verificar y corroborar en el portal web Fonasa / sistemas los 4 datos obligatorios:',
        image: '/recepcion/1bonopad.jpg',
        points: [
          {
            num: 1,
            title: 'Datos del Paciente',
            desc: 'Verificar RUT, nombre completo del asegurado/cargas y corroborar con su documento de identidad.'
          },
          {
            num: 2,
            title: 'Detalle de la Prestación y Copago',
            desc: 'Comprobar el código de bono PAD Fonasa, la especialidad asignada y la confirmación del monto de copago.'
          },
          {
            num: 3,
            title: 'Información sobre la Institución',
            desc: 'Validar que el bono señale explícitamente a Policlínico Tabancura como prestador autorizado.'
          },
          {
            num: 4,
            title: 'Nro. del Bono',
            desc: 'Identificar y digitar el número único del Bono en el sistema para la emisión de la atención.'
          }
        ]
      },
      {
        stepNumber: 2,
        title: 'En Dentalink, seleccionar el plan de tratamiento del paciente',
        description: 'Ingresar a la ficha del paciente en Dentalink y seguir los pasos indicados en la pantalla de cobro:',
        image: '/recepcion/2seleccion.jpg',
        points: [
          {
            num: 1,
            title: 'Selecciona el plan de tratamiento',
            desc: ''
          },
          {
            num: 2,
            title: 'Seleccionar pago de tratamiento(s)',
            desc: ''
          }
        ]
      },
      {
        stepNumber: 3,
        title: 'Validar las prestaciones asociadas al plan de tratamiento',
        description: 'Verificar y marcar con exactitud las prestaciones del plan de tratamiento registradas que corresponden al bono PAD Fonasa a ingresar:',
        image: '/recepcion/3prestaciones.jpg',
        points: [
          {
            num: 1,
            title: 'Selección de prestación',
            desc: ''
          },
          {
            num: 2,
            title: 'Resumen de totales',
            desc: ''
          }
        ]
      },
      {
        stepNumber: 4,
        title: 'Registrar el pago del bono en el sistema',
        description: 'Completar el registro de pago en el módulo de Dentalink ingresando los datos del comprobante:',
        image: '/recepcion/4pago.jpg',
        points: [
          {
            num: 1,
            title: 'Seleccione el medio de pago',
            desc: ''
          },
          {
            num: 2,
            title: 'Ingrese el número del bono',
            desc: ''
          },
          {
            num: 3,
            title: 'Ingrese la transacción',
            desc: ''
          }
        ]
      },
      {
        stepNumber: 5,
        title: 'Emitir la boleta correspondiente',
        description: 'Generar y emitir el documento tributario electrónico (boleta de atención) correspondiente al cobro registrado para el paciente.'
      }
    ],
    importantNote: 'Ante cualquier inconsistencia en los datos del paciente, código de prestación o monto de copago, derivar a Administración (Anexo 219) antes de autorizar el ingreso.'
  }
];

const KlapArticleDetail = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
  const [zoomState, setZoomState] = useState<{
    show: boolean;
    x: number;
    y: number;
    cursorX: number;
    cursorY: number;
  }>({ show: false, x: 0, y: 0, cursorX: 0, cursorY: 0 });

  const handlePrev = () => {
    if (selectedStepIndex === null) return;
    setZoomState(prev => ({ ...prev, show: false }));
    setSelectedStepIndex(prev => (prev! > 0 ? prev! - 1 : klapTutorialSteps.length - 1));
  };

  const handleNext = () => {
    if (selectedStepIndex === null) return;
    setZoomState(prev => ({ ...prev, show: false }));
    setSelectedStepIndex(prev => (prev! < klapTutorialSteps.length - 1 ? prev! + 1 : 0));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomState({
      show: true,
      x,
      y,
      cursorX: e.clientX - rect.left,
      cursorY: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setZoomState(prev => ({ ...prev, show: false }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedStepIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedStepIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStepIndex]);

  const activeStep = selectedStepIndex !== null ? klapTutorialSteps[selectedStepIndex] : null;

  return (
    <div className="full-article-grid">
      <div className="article-main-card glass-panel animate-slide-up">
        <h3>Guía de Uso y Tutorial Paso a Paso</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
          Sigue estos 10 pasos para el correcto uso y solución de incidencias en los terminales Klap. Haz clic en cualquier parte de la tarjeta para ver los detalles.
        </p>

        <div className="klap-tutorial-grid">
          {klapTutorialSteps.map((step, idx) => (
            <div key={step.id} className="klap-step-card" onClick={() => setSelectedStepIndex(idx)}>
              <div className="klap-step-header">
                <span className="klap-step-badge">{step.id}</span>
                <h4 className="klap-step-title">{step.title}</h4>
              </div>

              <div className="klap-img-wrapper">
                {step.img ? (
                  <img src={step.img} alt={`Klap paso ${step.id}: ${step.title}`} />
                ) : (
                  <div className="klap-icon-placeholder">
                    <AlertTriangle size={36} />
                    <span className="klap-icon-placeholder-text">Aviso Importante</span>
                  </div>
                )}

                <div className="klap-img-hover-overlay">
                  <span className="klap-img-hover-pill">
                    <Search size={15} />
                    Ver más
                  </span>
                </div>
              </div>

              <p className="klap-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="article-sidebar-column">
        {/* Bloque 1: Soporte Externo Klap */}
        <div className="article-sidebar-card glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3>Soporte Externo (Klap)</h3>

          <div className="klap-sidebar-section">
            <h4 className="klap-sidebar-subtitle">Escríbenos</h4>
            <div className="support-contact-item">
              <WhatsAppIcon size={18} />
              <a href="https://wa.me/56935547429" target="_blank" rel="noopener noreferrer">
                +56 9 3554 7429
              </a>
            </div>
          </div>

          <div className="klap-sidebar-section">
            <h4 className="klap-sidebar-subtitle">Contacto Soporte Klap</h4>
            <div className="support-contact-item">
              <Phone size={18} />
              <a href="tel:6003632020">600 363 2020</a>
            </div>
            <div className="support-contact-item">
              <Mail size={18} />
              <a href="mailto:contacto@klap.cl">contacto@klap.cl</a>
            </div>
            <span className="availability" style={{ marginTop: '6px', display: 'block' }}>
              Contact Center 24 horas los 7 días de la semana.
            </span>
          </div>
        </div>

        {/* Bloque 2: Soporte Interno Policlínico */}
        <div className="article-sidebar-card glass-panel animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3>Soporte Interno (Policlínico)</h3>

          <div className="internal-contact-card">
            <div className="contact-role-badge">Incidencias Técnicas</div>
            <span className="contact-name">Nicolás Jofré Andrade</span>
            <span className="contact-title">Encargado de TI</span>
            <div className="contact-links">
              <a href="mailto:njofre@policlinicotabancura.cl" className="contact-link">
                <Mail size={14} /> njofre@policlinicotabancura.cl
              </a>
              <span className="contact-ext">
                <Phone size={14} /> Anexo <strong>222</strong>
              </span>
            </div>
          </div>

          <div className="internal-contact-card">
            <div className="contact-role-badge admin">Financieras & Pagos</div>
            <span className="contact-name">Andrea Palma Cabezas</span>
            <span className="contact-title">Encargada de Administración</span>
            <div className="contact-links">
              <a href="mailto:apalma@policlinicotabancura.cl" className="contact-link">
                <Mail size={14} /> apalma@policlinicotabancura.cl
              </a>
              <span className="contact-ext">
                <Phone size={14} /> Anexo <strong>219</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal Modal de Detalle con Flechas */}
      {activeStep !== null && (
        <div className="klap-modal-backdrop" onClick={() => setSelectedStepIndex(null)}>
          <div className="klap-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            {/* Left Arrow Button */}
            <button
              className="klap-modal-nav-btn klap-modal-nav-prev"
              onClick={handlePrev}
              aria-label="Paso anterior"
              title="Paso anterior (Flecha izquierda)"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="klap-modal-content">
              <button
                className="klap-modal-close"
                onClick={() => setSelectedStepIndex(null)}
                aria-label="Cerrar detalle"
              >
                <X size={20} />
              </button>

              <div
                className="klap-modal-img-container"
                onMouseMove={activeStep.img ? handleMouseMove : undefined}
                onMouseLeave={activeStep.img ? handleMouseLeave : undefined}
              >
                {activeStep.img ? (
                  <>
                    <img src={activeStep.img} alt={`Klap paso ${activeStep.id}: ${activeStep.title}`} />
                    {zoomState.show && (
                      <div
                        className="klap-zoom-lens"
                        style={{
                          left: `${zoomState.cursorX}px`,
                          top: `${zoomState.cursorY}px`,
                          backgroundImage: `url(${activeStep.img})`,
                          backgroundPosition: `${zoomState.x}% ${zoomState.y}%`,
                          backgroundSize: '280% 280%',
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div className="klap-modal-icon-placeholder">
                    <AlertTriangle size={56} />
                    <span>Aviso e Información Importante</span>
                  </div>
                )}
              </div>

              <div className="klap-modal-info">
                <div className="klap-modal-header">
                  <span className="klap-modal-badge">{activeStep.id}</span>
                  <h4 className="klap-modal-title">{activeStep.title}</h4>
                </div>

                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  {activeStep.desc}
                </p>

                <div className="klap-modal-instructions">
                  <h5>Instrucciones paso a paso</h5>
                  <ol>
                    {activeStep.instructions.map((inst, index) => (
                      <li key={index}>{inst}</li>
                    ))}
                  </ol>
                </div>

                <div className="klap-modal-footer-nav">
                  <span className="klap-step-counter">
                    Paso {activeStep.id} de {klapTutorialSteps.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              className="klap-modal-nav-btn klap-modal-nav-next"
              onClick={handleNext}
              aria-label="Paso siguiente"
              title="Paso siguiente (Flecha derecha)"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RecepcionArticleDetail = () => {
  const [newsList] = useState<RecepcionNewsItem[]>(INITIAL_RECEPCION_NEWS);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Todas');
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  const filteredNews = selectedCategoryFilter === 'Todas'
    ? newsList
    : newsList.filter(item => item.category === selectedCategoryFilter);

  return (
    <div className="full-article-grid">
      <div className="article-main-card glass-panel animate-slide-up">
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>Procedimientos y Noticias de Recepción</h3>
          <p style={{ color: 'var(--color-text-secondary)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            Base de conocimiento interna con instructivos, avisos y protocolos de atención diaria.
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
          {['Todas', 'Procedimiento', 'Protocolo', 'Aviso', 'Capacitación'].map(cat => {
            const count = cat === 'Todas'
              ? newsList.length
              : newsList.filter(item => item.category === cat).length;
            const isActive = selectedCategoryFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`tab-btn ${isActive ? 'active' : ''}`}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingRight: '12px'
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: isActive ? '#00d2ff' : 'rgba(255, 255, 255, 0.12)',
                    color: isActive ? '#020617' : '#cbd5e1',
                    lineHeight: 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Lista de Noticias / Procedimientos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredNews.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No hay publicaciones en la categoría seleccionada.
            </div>
          ) : (
            filteredNews.map(item => {
              const isExpanded = expandedNewsId === item.id;
              return (
                <div
                  key={item.id}
                  className="glass-panel"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: isExpanded ? '1px solid rgba(0, 210, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
                    background: isExpanded ? 'rgba(0, 210, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div
                    onClick={() => setExpandedNewsId(isExpanded ? null : item.id)}
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span className="category-tag" style={{ background: 'rgba(0, 210, 255, 0.15)', color: '#00d2ff' }}>
                          {item.category}
                        </span>
                        {item.badge && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)', color: '#ffffff', boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)' }}>
                            {item.badge}
                          </span>
                        )}
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                          {item.date} • {item.author}
                        </span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                        {item.summary}
                      </p>
                    </div>

                    <button
                      style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '4px' }}
                      aria-label="Expandir o contraer noticia"
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="animate-slide-up" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      {item.tutorialSteps && item.tutorialSteps.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '20px' }}>
                          {item.tutorialSteps.map((st) => (
                            <div
                              key={st.stepNumber}
                              style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '14px',
                                padding: '18px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <span
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 800,
                                    fontSize: '0.95rem',
                                    flexShrink: 0,
                                    boxShadow: '0 3px 10px rgba(0, 210, 255, 0.35)'
                                  }}
                                >
                                  {st.stepNumber}
                                </span>
                                <h5 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff', fontWeight: 700 }}>
                                  {st.title}
                                </h5>
                              </div>

                              <p style={{ margin: '0 0 14px 0', fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                                {st.description}
                              </p>

                              {st.image && (
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)', marginBottom: st.points && st.points.length > 0 ? '18px' : '0' }}>
                                  <img
                                    src={st.image}
                                    alt={`Paso ${st.stepNumber}: ${st.title}`}
                                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                                  />
                                </div>
                              )}

                              {st.points && st.points.length > 0 && (
                                <div style={{ marginTop: '12px' }}>
                                  <h6 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#56b48c', margin: '0 0 10px 0', fontWeight: 700 }}>
                                    Campos a revisar en el bono:
                                  </h6>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px' }}>
                                    {st.points.map((pt) => (
                                      <div
                                        key={pt.num}
                                        style={{
                                          padding: '10px 14px',
                                          borderRadius: '8px',
                                          background: 'rgba(255, 255, 255, 0.03)',
                                          border: '1px solid rgba(86, 180, 140, 0.25)',
                                          display: 'flex',
                                          gap: '10px',
                                          alignItems: 'center'
                                        }}
                                      >
                                        <span
                                          style={{
                                            width: '26px',
                                            height: '26px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #56b48c 0%, #3e8869 100%)',
                                            color: '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                            flexShrink: 0,
                                            boxShadow: '0 2px 8px rgba(86, 180, 140, 0.4)'
                                          }}
                                        >
                                          {pt.num}
                                        </span>
                                        <h6 style={{ margin: 0, fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>
                                          {pt.title}
                                        </h6>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {item.importantNote && (
                        <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', color: '#fcd34d' }}>
                            <strong>Nota:</strong> {item.importantNote}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="article-sidebar-column">
        {/* Panel lateral: Resumen de Recepción */}
        <div className="article-sidebar-card glass-panel animate-slide-up">
          <h3>Información de Recepción</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Canales de comunicación directa y anexos clave para la gestión de recepción en ambas sucursales.
          </p>

          <div className="klap-sidebar-section">
            <h4 className="klap-sidebar-subtitle">Anexos Directos</h4>
            <div className="support-contact-item">
              <Phone size={16} />
              <span>Recepción Vitacura 1p: <strong>200 / 201</strong></span>
            </div>
            <div className="support-contact-item">
              <Phone size={16} />
              <span>Recepción Vitacura 3p: <strong>212</strong></span>
            </div>
            <div className="support-contact-item">
              <Phone size={16} />
              <span>Recepción Los Tribunales: <strong>100 / 101</strong></span>
            </div>
          </div>

          <div className="klap-sidebar-section">
            <h4 className="klap-sidebar-subtitle">Correos Oficiales</h4>
            <div className="support-contact-item">
              <Mail size={16} />
              <a href="mailto:recepciondental@policlinicotabancura.cl">recepciondental@policlinicotabancura.cl</a>
            </div>
            <div className="support-contact-item">
              <Mail size={16} />
              <a href="mailto:recepcionmedica@policlinicotabancura.cl">recepcionmedica@policlinicotabancura.cl</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnexosArticleDetail = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>('clinica');
  const [activeBranchTab, setActiveBranchTab] = useState<'vitacura' | 'tribunales'>('vitacura');

  const EMAIL_CATEGORIES = [
    {
      id: 'clinica',
      title: 'Servicios Clínicos y Atención',
      icon: <Stethoscope size={18} />,
      emails: [
        { label: 'Área Dental', value: 'recepciondental@policlinicotabancura.cl' },
        { label: 'Área Médica', value: 'recepcionmedica@policlinicotabancura.cl' },
        { label: 'Administración Clínica', value: 'jmarchant@policlinicotabancura.cl' },
        { label: 'Servicio al Paciente', value: 'servicioalpaciente@policlinicotabancura.cl' },
        { label: 'Central Telefónica (B. Velásquez)', value: 'bvelasquez@policlinicotabancura.cl' },
        { label: 'Central Telefónica (M. Martínez)', value: 'vmartinez@policlinicotabancura.cl' },
      ]
    },
    {
      id: 'admin',
      title: 'Administración y Operaciones',
      icon: <Briefcase size={18} />,
      emails: [
        { label: 'Dirección General', value: 'tcovarrubias@policlinicotabancura.cl' },
        { label: 'Sucursal Casa Matriz', value: 'secretaria@policlinicotabancura.cl' },
        { label: 'Servicios Generales', value: 'fnilo@policlinicotabancura.cl' },
      ]
    },
    {
      id: 'finanzas',
      title: 'Finanzas, Contabilidad y RRHH',
      icon: <CreditCard size={18} />,
      emails: [
        { label: 'Administración y Finanzas', value: 'avalenzuela@policlinicotabancura.cl' },
        { label: 'Contabilidad (Gisella Guajardo)', value: 'gguajardo@policlinicotabancura.cl' },
        { label: 'Envío de Transferencias', value: 'pagos@policlinicotabancura.cl' },
        { label: 'Recursos Humanos', value: 'rrhh@policlinicotabancura.cl' },
        { label: 'Área Laboral', value: 'laboral@policlinicotabancura.cl' },
      ]
    },
    {
      id: 'direccion',
      title: 'Soporte TI',
      icon: <Wrench size={18} />,
      emails: [
        { label: 'Soporte & TI', value: 'njofre@policlinicotabancura.cl' },
      ]
    }
  ];

  const TRIBUNALES_ANEXOS = [
    { location: 'Recepción 1', inCharge: 'Recepcionista', number: '100' },
    { location: 'Recepción 2', inCharge: 'Recepcionista', number: '101' },
    { location: 'Sala Revelado RX', inCharge: 'Fernando Urbina', number: '102' },
  ];

  const VITACURA_ANEXOS = [
    { location: 'Recepción 1 - 1er piso', inCharge: 'Recepcionista', number: '200' },
    { location: 'Recepción 2 - 1er piso', inCharge: 'Recepcionista', number: '201' },
    { location: 'Box dental 1 - 1er piso', inCharge: 'Profesional', number: '202' },
    { location: 'Box dental 2 - 1er piso', inCharge: 'Profesional', number: '203' },
    { location: 'Box dental 3 - 1er piso', inCharge: 'Profesional', number: '204' },
    { location: 'Box dental 4 - 1er piso', inCharge: 'Profesional', number: '205' },
    { location: 'Box dental 5 - 1er piso', inCharge: 'Profesional', number: '206' },
    { location: 'Sala Laboratorio - 1er piso', inCharge: 'Profesional', number: '207' },
    { location: 'Sala Revelado RX - 1er piso', inCharge: 'Profesional', number: '208' },
    { location: 'Sala esterilización - 1er piso', inCharge: 'Profesional', number: '209' },
    { location: 'Recepción 3 - 3er piso', inCharge: 'Recepcionista', number: '212' },
    { location: 'Box dental/Consulta n°19 - 3er piso', inCharge: 'Profesional', number: '213' },
    { location: 'Box dental/Consulta n°20 - 3er piso', inCharge: 'Profesional', number: '214' },
    { location: 'Box dental/Consulta n°21 - 3er piso', inCharge: 'Profesional', number: '215' },
    { location: 'Box dental/Consulta n°22 - 3er piso', inCharge: 'Profesional', number: '216' },
    { location: 'Central telefónica - 3er piso', inCharge: 'Supervisoras', number: '217' },
    { location: 'Administración - 3er piso', inCharge: 'Andrea Palma', number: '219' },
    { location: 'Administración clínica - 3er piso', inCharge: 'Javiera Marchant', number: '221' },
    { location: 'TIC - 3er piso', inCharge: 'Nicolás Jofré', number: '222' },
    { location: 'Asistente Contable - 3er piso', inCharge: 'Gisella Guajardo', number: '223' },
    { location: 'Servicios Generales - 3er piso', inCharge: 'Felipe Nilo', number: '224' },
  ];

  const currentAnexos = activeBranchTab === 'vitacura' ? VITACURA_ANEXOS : TRIBUNALES_ANEXOS;

  const toggleCategory = (catId: string) => {
    setActiveCategory(activeCategory === catId ? null : catId);
  };

  return (
    <div className="full-article-grid">
      <div className="article-main-card glass-panel animate-slide-up">
        <h3>Números Principales y Públicos</h3>
        <div className="external-numbers-grid">
          <div className="external-branch-card">
            <h4>Sucursal Vitacura</h4>
            <div className="ext-num-item">
              <MapPin size={14} />
              <a href="https://g.page/r/CQnnnRuZmSXvEAE" target="_blank" rel="noopener noreferrer">Av. Vitacura #8620</a>
            </div>
            <div className="ext-num-item">
              <Phone size={14} />
              <a href="tel:+56229336740">+56 2 2933 6740</a>
            </div>
            <div className="ext-num-item">
              <WhatsAppIcon size={14} />
              <a href="https://wa.me/56965781253" target="_blank" rel="noopener noreferrer">+56 9 6578 1253 (WhatsApp)</a>
            </div>
          </div>

          <div className="external-branch-card">
            <h4>Sucursal Los Tribunales</h4>
            <div className="ext-num-item">
              <MapPin size={14} />
              <a href="https://g.page/r/CQIjawVKOBfhEAE" target="_blank" rel="noopener noreferrer">Calle Los Tribunales #1268</a>
            </div>
            <div className="ext-num-item">
              <Phone size={14} />
              <a href="tel:+56222172635">+56 2 2217 2635</a>
            </div>
            <div className="ext-num-item">
              <WhatsAppIcon size={14} />
              <a href="https://wa.me/56966187736" target="_blank" rel="noopener noreferrer">+56 9 6618 7736 (WhatsApp)</a>
            </div>
          </div>
        </div>

        <div className="anexos-section-header">
          <h3>Anexos Telefónicos Internos (VOIP)</h3>
          <div className="branch-tabs">
            <button
              onClick={() => setActiveBranchTab('vitacura')}
              className={`tab-btn ${activeBranchTab === 'vitacura' ? 'active' : ''}`}
            >
              Vitacura (200)
            </button>
            <button
              onClick={() => setActiveBranchTab('tribunales')}
              className={`tab-btn ${activeBranchTab === 'tribunales' ? 'active' : ''}`}
            >
              Los Tribunales (100)
            </button>
          </div>
        </div>

        <div className="directory-table-container">
          <table className="directory-table">
            <thead>
              <tr>
                <th>Ubicación Física</th>
                <th>Encargado/a</th>
                <th>N° de Anexo</th>
              </tr>
            </thead>
            <tbody>
              {currentAnexos.map((anexo) => (
                <tr key={anexo.number}>
                  <td><strong>{anexo.location}</strong></td>
                  <td>{anexo.inCharge}</td>
                  <td><span className="anexo-tag">{anexo.number}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="article-sidebar-card glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h3>Canales de Correo Electrónico</h3>
        <div className="email-accordion">
          {EMAIL_CATEGORIES.map((category) => {
            const isOpen = activeCategory === category.id;
            return (
              <div key={category.id} className={`accordion-group ${isOpen ? 'open' : ''}`}>
                <button
                  className="accordion-header"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isOpen}
                >
                  <div className="accordion-title-wrapper">
                    {category.icon}
                    <span>{category.title}</span>
                  </div>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isOpen && (
                  <div className="accordion-content animate-slide-up">
                    <div className="email-directory-list">
                      {category.emails.map((email, idx) => (
                        <div key={`${email.value}-${idx}`} className="email-directory-item">
                          <span className="email-title">{email.label}</span>
                          <a href={`mailto:${email.value}`}>{email.value}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function ArticleDetailView({ id, onClose, apps }: { id: number; onClose: () => void; apps: Array<typeof APPS_DATA[number]> }) {
  const activeArticle = apps.find(app => app.id === id) || APPS_DATA.find(app => app.id === id);
  if (!activeArticle) return null;

  const slug = activeArticle.slug || (
    activeArticle.name.toLowerCase().includes('klap') ? 'soporte-klap' :
    activeArticle.name.toLowerCase().includes('anexo') ? 'anexos-y-correos' :
    activeArticle.name.toLowerCase().includes('recep') ? 'recepcion' : ''
  );

  return (
    <div className="article-detail-container glass-panel animate-fade-in">
      <div className="article-detail-header">
        <button className="back-btn glass-panel animate-pulse-light" onClick={onClose}>
          <ArrowLeft size={16} />
          Volver al Ecosistema
        </button>
        <span className={`category-tag-large ${activeArticle.category.toLowerCase()}`}>{activeArticle.category}</span>
      </div>

      <div className="article-detail-title-section">
        <div className="article-icon-large">
          {activeArticle.icon}
        </div>
        <div className="article-title-text-group">
          <h2 className="article-title-large text-gradient-cyan">{activeArticle.name}</h2>
          <p className="article-subtitle-large">{activeArticle.description}</p>
        </div>
      </div>

      <div className="article-detail-body">
        {slug === 'soporte-klap' && <KlapArticleDetail />}
        {slug === 'anexos-y-correos' && <AnexosArticleDetail />}
        {slug === 'recepcion' && <RecepcionArticleDetail />}
      </div>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<string>('dark');
  const [search, setSearch] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [reloadText, setReloadText] = useState<string>('Actualizar Ecosistema');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [appsData, setAppsData] = useState<typeof APPS_DATA>(APPS_DATA);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [selectedAppHelp, setSelectedAppHelp] = useState<{ appName: string; help: HelpInfo } | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<number | null>(null);
  const [selectedPromoModal, setSelectedPromoModal] = useState<Promotion | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(true);
  const [bannerSlideIndex, setBannerSlideIndex] = useState<number>(0);

  const bannerSlides = [
    {
      id: 'bonopad',
      type: 'article',
      badge: 'Nuevo Artículo',
      icon: <BookOpen size={15} />,
      text: 'Tutorial Recepción: Valida el paso a paso del Bono PAD Fonasa.',
      actionLabel: 'Ver tutorial',
      onClick: () => {
        const found = appsData.find(app => app.slug === 'recepcion') || APPS_DATA.find(app => app.slug === 'recepcion');
        if (found) handleOpenArticle(found.id);
      }
    },
    {
      id: 'promo-limpieza',
      type: 'promo',
      badge: 'Promoción Activa',
      icon: <Tag size={15} />,
      text: '¡Nueva promoción de Limpieza Dental de Octubre disponible a $24.000!',
      actionLabel: 'Ver promoción',
      onClick: () => {
        const promo = PROMOTIONS_DATA.find(p => p.id === 'limpieza-octubre');
        if (promo) setSelectedPromoModal(promo);
      }
    }
  ];

  useEffect(() => {
    if (!isBannerVisible) return;
    const interval = setInterval(() => {
      setBannerSlideIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isBannerVisible, bannerSlides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPromoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getIconElement = (type: string, name: string) => {
    switch (type) {
      case 'uptime':
        return <Image src={uptimeKumaLogo} alt="Uptime Kuma" width={24} height={24} style={{ objectFit: 'contain' }} />;
      case 'cloud':
        return <Cloud size={24} />;
      case 'credit-card':
        return <CreditCard size={24} />;
      case 'file-text':
        return <FileText size={24} />;
      case 'calculator':
        return <Calculator size={24} />;
      case 'git-pull-request':
        return <GitPullRequest size={24} />;
      case 'cpu':
        return <Cpu size={24} />;
      case 'book-open':
        return <BookOpen size={24} />;
      case 'ticket':
        return <Ticket size={24} />;
      default:
        return <Globe size={24} />;
    }
  };

  const loadAppsFromDb = async () => {
    try {
      const res = await fetch('/api/apps');
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const mapped = data.data.map((row: any) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          url: row.url || undefined,
          slug: row.slug || undefined,
          status: row.status,
          category: row.category,
          metric: row.metric || undefined,
          metricLabel: row.metric_label || undefined,
          isArticle: Boolean(row.is_article),
          icon: getIconElement(row.icon_type, row.name),
          helpInfo: row.help_info || undefined,
        }));
        setAppsData(mapped);
      }
    } catch {
      // Si falla, se mantiene con APPS_DATA por defecto
    }
  };

  useEffect(() => {
    loadAppsFromDb();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initial route check from URL path (e.g. /recepcion, /soporte-klap)
    const handleRouteChange = () => {
      const path = window.location.pathname.replace('/', '').toLowerCase();
      if (path) {
        const found = appsData.find(app => app.isArticle && app.slug === path) || APPS_DATA.find(app => app.isArticle && app.slug === path);
        if (found) {
          setActiveArticleId(found.id);
          return;
        }
      }
      setActiveArticleId(null);
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);

    // Clock setup
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }));
      setDateStr(now.toLocaleDateString("es-CL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (activeArticleId !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeArticleId]);

  const handleOpenArticle = (id: number) => {
    const found = appsData.find(app => app.id === id) || APPS_DATA.find(app => app.id === id);
    if (found?.slug) {
      window.history.pushState({}, '', `/${found.slug}`);
      setActiveArticleId(id);
    } else {
      setActiveArticleId(id);
    }
  };

  const handleCloseArticle = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setActiveArticleId(null);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const handleReload = (e: React.MouseEvent) => {
    e.preventDefault();
    setReloadText('Actualizando...');
    setIsReloading(true);
    loadAppsFromDb();
    setTimeout(() => {
      setReloadText('Actualizar Ecosistema');
      setIsReloading(false);
    }, 800);
  };

  // Filter APPS
  const filteredApps = appsData.filter((app) => {
    const matchesFilter = activeFilter === 'all' || app.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryCount = (cat: string) => {
    return appsData.filter((app) => {
      const matchesCategory = cat === 'all' || app.category.toLowerCase() === cat.toLowerCase();
      const matchesSearch = !search || app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }).length;
  };

  const appsCount = filteredApps.filter(app => !app.isArticle).length;
  const articlesCount = filteredApps.filter(app => app.isArticle).length;

  const getCountText = () => {
    const parts = [];
    if (appsCount > 0) {
      parts.push(`${appsCount} aplicación${appsCount !== 1 ? 'es' : ''}`);
    }
    if (articlesCount > 0) {
      parts.push(`${articlesCount} artículo${articlesCount !== 1 ? 's' : ''}`);
    }
    if (parts.length === 0) {
      return "0 aplicaciones encontradas";
    }
    const countStr = parts.join(' y ');
    const isPlural = (appsCount + articlesCount) !== 1;
    const text = `${countStr} encontrado${isPlural ? 's' : ''}`;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('apps-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePromotionsClick = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('promotions-widget');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Sticky Announcement Bar - Absolute Full Width Top */}
      {isBannerVisible && (
        <div className={`sticky-announcement-bar type-${bannerSlides[bannerSlideIndex].type}`}>
          <div className="sticky-bar-inner">
            <div className="sticky-bar-content">
              <span className="sticky-badge">
                {bannerSlides[bannerSlideIndex].icon}
                {bannerSlides[bannerSlideIndex].badge}
              </span>
              <p className="sticky-text">
                {bannerSlides[bannerSlideIndex].text}
              </p>
              <button
                onClick={bannerSlides[bannerSlideIndex].onClick}
                className="sticky-action-btn"
              >
                {bannerSlides[bannerSlideIndex].actionLabel} &rarr;
              </button>
            </div>

            <div className="sticky-bar-controls">
              {bannerSlides.length > 1 && (
                <div className="sticky-dots">
                  {bannerSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      className={`sticky-dot type-${slide.type} ${idx === bannerSlideIndex ? 'active' : ''}`}
                      onClick={() => setBannerSlideIndex(idx)}
                      aria-label={`Ir al anuncio ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
              <button
                onClick={() => setIsBannerVisible(false)}
                className="sticky-close-btn"
                title="Cerrar aviso"
                aria-label="Cerrar aviso"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="dashboard-container">
        {/* Top Header Bar */}
        <header className="dashboard-header glass-panel">
        <div className="brand-section">
          <div className="logo-glow">
            <Image
              src={logo}
              alt="Logo Policlínico Tabancura"
              className="logo-img"
              width={64}
              height={64}
              priority
            />
          </div>
          <div className="brand-text">
            <h1 className="welcome-title">Portal Digital - Policlínico Tabancura</h1>
            {isMounted && (
              <div className="brand-datetime">
                <span className="brand-time">{time}</span>
                <span className="brand-date-separator">•</span>
                <span className="brand-date">{dateStr}</span>
              </div>
            )}
          </div>
        </div>

        <div className="header-right">
          {/* Social Networks */}
          <div className="social-links">
            <a href="https://policlinicotabancura.dentalink.cl/sessions/login" target="_blank" rel="noopener noreferrer" className="social-link-btn glass-panel has-tooltip dentalink-btn" data-tooltip="Acceso Dentalink" aria-label="Acceso Dentalink">
              <Tooth size={20} />
            </a>
            <a href="https://ptabancura.app.softwaremedilink.com/medilink/" target="_blank" rel="noopener noreferrer" className="social-link-btn glass-panel has-tooltip medilink-btn" data-tooltip="Acceso Medilink" aria-label="Acceso Medilink">
              <Stethoscope size={20} />
            </a>
            <a href="https://gestion.policlinicotabancura.cl/ticket" target="_blank" rel="noopener noreferrer" className="social-link-btn glass-panel has-tooltip ticket-header-btn" data-tooltip="Tickets TI & Mesa de Ayuda" aria-label="Tickets TI & Mesa de Ayuda">
              <Ticket size={20} />
            </a>
            <a href="https://www.instagram.com/politabancura/" target="_blank" rel="noopener noreferrer" className="social-link-btn glass-panel has-tooltip" data-tooltip="Instagram" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61568214167163" target="_blank" rel="noopener noreferrer" className="social-link-btn glass-panel has-tooltip" data-tooltip="Facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/policlinico-tabancura/" target="_blank" rel="noopener noreferrer" className="social-link-btn glass-panel has-tooltip" data-tooltip="LinkedIn" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="theme-toggle-btn glass-panel has-tooltip" data-tooltip={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'} aria-label="Cambiar tema">
            {theme === 'light' ? <Sun className="sun-icon" size={20} /> : <Moon className="moon-icon" size={20} />}
          </button>

        </div>
      </header>

      {activeArticleId !== null ? (
        <ArticleDetailView id={activeArticleId} onClose={handleCloseArticle} apps={appsData} />
      ) : (
        <>
          {/* Hero Search & Floating Filter Controls (Opción 3 - Botones Arriba) */}
          <section className="controls-hero-section">
            {/* Floating Filter Pills (Arriba y Centrados) */}
            <div className="category-floating-bar">
              <button onClick={() => handleFilterClick('all')} className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} data-filter="all">
                <LayoutGrid size={15} />
                <span>Todos</span>
                <span className="pill-badge">{getCategoryCount('all')}</span>
              </button>
              <button onClick={() => handleFilterClick('médica')} className={`filter-pill ${activeFilter === 'médica' ? 'active' : ''}`} data-filter="médica">
                <Stethoscope size={15} />
                <span>Área Médica</span>
                <span className="pill-badge">{getCategoryCount('médica')}</span>
              </button>
              <button onClick={() => handleFilterClick('administrativa')} className={`filter-pill ${activeFilter === 'administrativa' ? 'active' : ''}`} data-filter="administrativa">
                <Briefcase size={15} />
                <span>Área Administrativa</span>
                <span className="pill-badge">{getCategoryCount('administrativa')}</span>
              </button>
              <button onClick={() => handleFilterClick('soporte')} className={`filter-pill ${activeFilter === 'soporte' ? 'active' : ''}`} data-filter="soporte">
                <Wrench size={15} />
                <span>Soporte & TI</span>
                <span className="pill-badge">{getCategoryCount('soporte')}</span>
              </button>
              <button onClick={() => handleFilterClick('apis')} className={`filter-pill ${activeFilter === 'apis' ? 'active' : ''}`} data-filter="apis">
                <Cpu size={15} />
                <span>APIs</span>
                <span className="pill-badge">{getCategoryCount('apis')}</span>
              </button>
            </div>

            {/* Buscador Hero */}
            <div className="search-hero-container glass-panel">
              <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="¿Qué servicio o aplicación necesitas buscar?..."
                  aria-label="Buscar aplicación"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearch('')}
                    aria-label="Limpiar búsqueda"
                    title="Limpiar búsqueda"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="search-actions-group">
                <button
                  type="button"
                  onClick={handlePromotionsClick}
                  className="search-action-chip promo-chip promo-mobile-btn"
                  title="Ver promociones activas"
                >
                  <Tag size={15} />
                  <span>Promociones</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsHelpOpen(true)}
                  className="search-action-chip help-chip"
                  title="Guía de colores y categorías"
                  aria-label="Ayuda de categorías"
                >
                  <HelpCircle size={16} />
                  <span>Ayuda</span>
                </button>
              </div>
            </div>
          </section>

          {/* Main Grid Layout */}
          <div className="main-dashboard-grid">
            {/* LEFT column: Widgets */}
            <aside className="widgets-sidebar">
              <div className="widget-wrapper promotions-widget glass-panel" id="promotions-widget">
                <h3 className="widget-title">
                  <Tag size={18} />
                  Promociones activas
                </h3>
                <div className="promotions-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {PROMOTIONS_DATA.length > 0 ? (
                    PROMOTIONS_DATA.map((promo) => (
                      <div key={promo.id} className="promo-card glow-card">
                        {promo.badge && <div className="promo-badge">{promo.badge}</div>}
                        <h4 className="promo-title">{promo.title}</h4>

                        <div
                          className="promo-image-clickable"
                          onClick={() => setSelectedPromoModal(promo)}
                          title="Haz clic para ver en detalle"
                        >
                          <Image
                            src={promo.image}
                            alt={`Promo ${promo.title}`}
                            placeholder="blur"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                          <div className="promo-image-hover-overlay">
                            <ZoomIn size={18} />
                            <span>Ver en detalle</span>
                          </div>
                        </div>

                        <div className="promo-includes">
                          <span className="includes-title">Incluye:</span>
                          <ul>
                            {promo.includes.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="promo-price-box">
                          <span className="price-old">Antes: ${promo.priceOld}</span>
                          <div className="price-current-wrapper">
                            <span className="price-currency">$</span>
                            <span className="price-value">{promo.priceCurrent}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                          <a
                            href={promo.scheduleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="promo-cta-btn"
                          >
                            Agendar
                          </a>
                          <a
                            href={promo.imageDownloadPath}
                            download={promo.downloadFilename}
                            className="promo-download-btn"
                          >
                            <Download size={16} />
                            Descargar Imagen
                          </a>
                        </div>

                        <div className="promo-footer">
                          <span>{promo.footerText}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-promotions">
                      No hay promociones activas por el momento.
                    </p>
                  )}
                </div>
              </div>
              <div className="widget-wrapper">
                <CalendarWidget />
              </div>
            </aside>

            {/* RIGHT column: App Grid */}
            <section className="apps-container" id="apps-container">
              <div className="section-title">
                <h2>Apps</h2>
                <span className="apps-count">
                  {getCountText()}
                </span>
              </div>

              <div className={`apps-grid ${isReloading ? 'pop-animation' : ''}`}>
                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    id={app.id}
                    name={app.name}
                    description={app.description}
                    url={app.url}
                    status={app.status}
                    category={app.category}
                    metric={app.metric}
                    metricLabel={app.metricLabel}
                    icon={app.icon}
                    isArticle={app.isArticle}
                    onOpenArticle={handleOpenArticle}
                    helpInfo={app.helpInfo}
                    onOpenHelp={(appName, help) => setSelectedAppHelp({ appName, help })}
                  />
                ))}
              </div>
            </section>
          </div>
        </>
      )}

      {/* Dashboard Footer */}
      <footer className="dashboard-footer-new glass-panel">
        <div className="footer-branches">
          {/* Logo & Branding column */}
          <div className="footer-brand-column">
            <div className="logo-glow">
              <Image
                src={logo}
                alt="Logo Policlínico Tabancura"
                className="logo-img-footer"
                width={80}
                height={80}
              />
            </div>
            <p className="footer-brand-desc">
              Tecnología y cuidado humano al servicio de tu salud.
            </p>
          </div>

          <div className="footer-branch">
            <h4 className="branch-title">Sucursal Vitacura</h4>
            <div className="branch-info">
              <div className="info-item">
                <MapPin size={16} />
                <a href="https://g.page/r/CQnnnRuZmSXvEAE" target="_blank" rel="noopener noreferrer">Av. Vitacura #8620</a>
              </div>
              <div className="info-item">
                <Phone size={16} />
                <a href="tel:+56229336740">+56 2 2933 6740</a>
              </div>
              <div className="info-item">
                <WhatsAppIcon size={16} />
                <a href="https://wa.me/56965781253" target="_blank" rel="noopener noreferrer">+56 9 6578 1253</a>
              </div>
              <div className="info-item align-start">
                <Mail size={16} style={{ marginTop: '3px' }} />
                <div className="emails-list">
                  <a href="mailto:recepciondental@policlinicotabancura.cl">recepciondental@policlinicotabancura.cl</a>
                  <a href="mailto:recepcionmedica@policlinicotabancura.cl">recepcionmedica@policlinicotabancura.cl</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-branch">
            <h4 className="branch-title">Casa Matriz - Los Tribunales</h4>
            <div className="branch-info">
              <div className="info-item">
                <MapPin size={16} />
                <a href="https://g.page/r/CQIjawVKOBfhEAE" target="_blank" rel="noopener noreferrer">Calle Los Tribunales #1268</a>
              </div>
              <div className="info-item">
                <Phone size={16} />
                <a href="tel:+56222172635">+56 2 2217 2635</a>
              </div>
              <div className="info-item">
                <WhatsAppIcon size={16} />
                <a href="https://wa.me/56966187736" target="_blank" rel="noopener noreferrer">+56 9 6618 7736</a>
              </div>
              <div className="info-item">
                <Mail size={16} />
                <a href="mailto:secretaria@policlinicotabancura.cl">secretaria@policlinicotabancura.cl</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Policlínico Tabancura - TI & Infraestructura Médica. Todos los derechos reservados.</span>
          <div className="footer-links">
            <a href="https://policlinicotabancura.cl" target="_blank" rel="noopener noreferrer">Web Principal</a>
            <span>•</span>
            <a href="#" onClick={handleReload}>{reloadText}</a>
            <span>•</span>
            <a href="/admin" className="admin-footer-link" title="Panel de Administración TI">Admin</a>
          </div>
        </div>
      </footer>

      {/* App Specific Help Modal / Popup */}
      {selectedAppHelp && (
        <div className="help-modal-overlay" onClick={() => setSelectedAppHelp(null)}>
          <div className="app-help-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="app-help-title-area">
                <div className="app-help-icon-wrap">
                  <HelpCircle size={22} />
                </div>
                <div>
                  <div className="app-help-name">{selectedAppHelp.appName}</div>
                  <h3 className="app-help-heading">{selectedAppHelp.help.title || "Ayuda y Soporte Técnico"}</h3>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedAppHelp(null)}
                aria-label="Cerrar ventana de ayuda"
              >
                <X size={20} />
              </button>
            </div>

            <div className="app-help-body">
              {selectedAppHelp.help.description && (
                <p className="app-help-desc">{selectedAppHelp.help.description}</p>
              )}

              {selectedAppHelp.help.steps && selectedAppHelp.help.steps.length > 0 && (
                <div>
                  <div className="app-help-section-title">Pasos de solución / Verificación:</div>
                  <ul className="app-help-steps-list">
                    {selectedAppHelp.help.steps.map((step, idx) => (
                      <li key={idx} className="app-help-step-item">
                        <span className="app-help-step-number">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(selectedAppHelp.help.contactName || selectedAppHelp.help.contactPhone || selectedAppHelp.help.contactEmail) && (
                <div className="app-help-contact-box">
                  <div className="app-help-section-title" style={{ margin: 0 }}>Canales de soporte directo:</div>
                  <div className="app-help-contact-row">
                    {selectedAppHelp.help.contactName && (
                      <span className="app-help-contact-name">{selectedAppHelp.help.contactName}</span>
                    )}
                    {selectedAppHelp.help.contactPhone && (
                      <a href={`tel:${selectedAppHelp.help.contactPhone}`} className="app-help-contact-link">
                        <Phone size={14} />
                        <span>{selectedAppHelp.help.contactPhone}</span>
                      </a>
                    )}
                    {selectedAppHelp.help.contactEmail && (
                      <a href={`mailto:${selectedAppHelp.help.contactEmail}`} className="app-help-contact-link">
                        <Mail size={14} />
                        <span>{selectedAppHelp.help.contactEmail}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {selectedAppHelp.help.guideUrl && (
                <a
                  href={selectedAppHelp.help.guideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-help-guide-btn"
                >
                  <BookOpen size={16} />
                  <span>Ver artículo o manual completo</span>
                </a>
              )}

              {selectedAppHelp.help.notes && (
                <p className="app-help-notes">
                  ℹ️ {selectedAppHelp.help.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {isHelpOpen && (
        <div className="help-modal-overlay" onClick={() => setIsHelpOpen(false)}>
          <div className="help-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Guía de Categorías</h3>
              <button className="modal-close-btn" onClick={() => setIsHelpOpen(false)} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-intro">
                Usa los colores y categorías para identificar y filtrar rápidamente las herramientas de la plataforma:
              </p>

              <div className="category-help-list">
                <div className="category-help-item">
                  <div className="category-color-dot medica"></div>
                  <div className="category-help-info">
                    <h4>Área Médica</h4>
                    <p>Sistemas clínicos y de especialidades directas para la atención de pacientes, como registros digitales o derivaciones.</p>
                  </div>
                </div>

                <div className="category-help-item">
                  <div className="category-color-dot administrativa"></div>
                  <div className="category-help-info">
                    <h4>Área Administrativa</h4>
                    <p>Herramientas de gestión comercial, validador de convenios, cotizaciones públicas de exámenes y sitio web institucional.</p>
                  </div>
                </div>

                <div className="category-help-item">
                  <div className="category-color-dot soporte"></div>
                  <div className="category-help-info">
                    <h4>Soporte & TI</h4>
                    <p>Monitoreo de estado de servidores, almacenamiento en nube del equipo técnico, y manuales o artículos de autoayuda.</p>
                  </div>
                </div>

                <div className="category-help-item">
                  <div className="category-color-dot apis"></div>
                  <div className="category-help-info">
                    <h4>APIs</h4>
                    <p>Servicios de consulta y sincronización de datos en tiempo real que operan de forma silenciosa en el backend.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Promo Image & Details Modal Viewer */}
      {selectedPromoModal && (
        <div className="promo-modal-backdrop" onClick={() => setSelectedPromoModal(null)}>
          <div className="promo-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="promo-modal-close"
              onClick={() => setSelectedPromoModal(null)}
              aria-label="Cerrar modal"
              title="Cerrar (Escape)"
            >
              <X size={20} />
            </button>

            <div className="promo-modal-body">
              <div className="promo-modal-image-col">
                <Image
                  src={selectedPromoModal.image}
                  alt={selectedPromoModal.title}
                  placeholder="blur"
                  className="promo-modal-img"
                />
              </div>

              <div className="promo-modal-details-col">
                {selectedPromoModal.badge && (
                  <div className="promo-badge">{selectedPromoModal.badge}</div>
                )}
                <h3 className="promo-modal-title">{selectedPromoModal.title}</h3>

                <div className="promo-includes">
                  <span className="includes-title">Incluye:</span>
                  <ul>
                    {selectedPromoModal.includes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="promo-price-box">
                  <span className="price-old">Antes: ${selectedPromoModal.priceOld}</span>
                  <div className="price-current-wrapper">
                    <span className="price-currency">$</span>
                    <span className="price-value">{selectedPromoModal.priceCurrent}</span>
                  </div>
                </div>

                <div className="promo-modal-actions">
                  <a
                    href={selectedPromoModal.scheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="promo-cta-btn"
                    style={{ textAlign: 'center' }}
                  >
                    Agendar Promoción
                  </a>
                  <a
                    href={selectedPromoModal.imageDownloadPath}
                    download={selectedPromoModal.downloadFilename}
                    className="promo-download-btn"
                  >
                    <Download size={16} />
                    Descargar Imagen Completa
                  </a>
                </div>

                <div className="promo-footer">
                  <span>{selectedPromoModal.footerText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
