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
  ChevronUp
} from 'lucide-react';
import AppCard from '@/components/AppCard';
import CalendarWidget from '@/components/CalendarWidget';
import logo from '../assets/logo.svg';
import uptimeKumaLogo from '../assets/uptime-kuma.svg';
import owncloudLogo from '../assets/owncloud.svg';

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

const APPS_DATA = [
  {
    id: 1,
    name: "https://policlinicotabancura.cl",
    description: "Nueva plataforma web institucional del Policlínico con servicios, profesionales, especialidades e información clave para pacientes.",
    url: "https://policlinicotabancura.cl",
    status: "online" as const,
    category: "Administrativa",
    metric: "v2.0",
    metricLabel: "Versión de sitio",
    icon: <Globe size={24} />
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
    icon: <Image src={uptimeKumaLogo} alt="Uptime Kuma" width={24} height={24} style={{ objectFit: 'contain' }} />
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
    icon: <Cloud size={24} />
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
    icon: <CreditCard size={24} />
  },
  {
    id: 5,
    name: "Registro Digital Dental",
    description: "Control y seguimiento clínico de los trabajos de laboratorio dental y prótesis solicitados.",
    status: "online" as const,
    category: "Médica",
    metric: "Dental",
    metricLabel: "Especialidad",
    icon: <FileText size={24} />
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
    icon: <Calculator size={24} />
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
    icon: <GitPullRequest size={24} />
  },
  {
    id: 8,
    name: "API inventarios En línea",
    description: "Interfaz de consulta y sincronización en tiempo real del inventario y stock de insumos clínicos.",
    url: "https://apiinventarios.policlinicotabancura.cl/",
    status: "dev" as const,
    category: "APIs",
    metric: "API REST",
    metricLabel: "Servicio Insumos",
    icon: <Cpu size={24} />
  },
  {
    id: 9,
    name: "API cotizador En línea",
    description: "Servicio backend para el procesamiento automatizado y cotizaciones en tiempo real del cotizador de exámenes.",
    status: "online" as const,
    category: "APIs",
    metric: "API REST",
    metricLabel: "Servicio Cotizador",
    icon: <Cpu size={24} />
  },
  {
    id: 10,
    name: "API Cerebro",
    description: "Middleware centralizado y consola de orquestación backend del ecosistema digital del Policlínico.",
    status: "dev" as const,
    category: "APIs",
    metric: "API REST",
    metricLabel: "Servicio Central",
    icon: <Cpu size={24} />
  },
  {
    id: 11,
    name: "Soporte Klap",
    description: "Guía paso a paso y manual de solución de problemas para el correcto funcionamiento del terminal de pagos Klap.",
    url: "#",
    status: "dev" as const,
    category: "Soporte",
    metric: "Artículo",
    metricLabel: "Manual de Insumos",
    icon: <BookOpen size={24} />,
    isArticle: true
  },
  {
    id: 12,
    name: "Anexos y correos",
    description: "Listado oficial de anexos telefónicos internos, cuentas de correo corporativas y canales de comunicación.",
    url: "#",
    status: "online" as const,
    category: "Administrativa",
    metric: "Artículo",
    metricLabel: "Directorio TI",
    icon: <BookOpen size={24} />,
    isArticle: true
  },
  {
    id: 13,
    name: "Registro de Radiología",
    description: "Control y registro de todo lo relacionado con los trabajos radiológicos de la institución.",
    status: "online" as const,
    category: "Médica",
    metric: "Radiología",
    metricLabel: "Especialidad",
    icon: <FileText size={24} />
  }
];

const KlapArticleDetail = () => (
  <div className="full-article-grid">
    <div className="article-main-card glass-panel animate-slide-up">
      <h3>Guía Rápida de Solución de Problemas</h3>
      <div className="article-steps-flow">
        <div className="flow-step">
          <div className="step-badge">1</div>
          <h4>Reinicio de Terminal</h4>
          <p>Mantén presionados los botones <strong>Amarillo</strong> + <strong>Borrar (Clear)</strong> simultáneamente por 3 segundos hasta que la pantalla se apague y se reinicie.</p>
        </div>
        <div className="flow-step">
          <div className="step-badge">2</div>
          <h4>Conexión a Red</h4>
          <p>Verifica que la red Wi-Fi <code>PT-Invitados</code> o <code>PT-POS</code> esté conectada, o que el indicador de señal GPRS (chip de datos móvil) tenga cobertura activa.</p>
        </div>
        <div className="flow-step">
          <div className="step-badge">3</div>
          <h4>Transacción de Prueba</h4>
          <p>Realiza una venta de prueba por un monto mínimo de <strong>$1 peso</strong>. Si la transacción es aprobada, el equipo está listo para operar.</p>
        </div>
      </div>
    </div>

    <div className="article-sidebar-card glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h3>Soporte Klap & TI</h3>
      <div className="support-phone-large">
        <span className="support-label">Línea Directa Klap</span>
        <span className="phone-num">600 300 3000</span>
        <span className="availability">Lunes a Domingo, 24/7</span>
      </div>

      <div className="support-info-alert">
        <strong>¿Problema persistente?</strong>
        <p>Contacta al área de TI del Policlínico en el anexo 104 o envía un correo a soporte@policlinicotabancura.cl indicando el número de serie del terminal.</p>
      </div>
    </div>
  </div>
);

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
      title: 'Finanzas, RRHH y Laboral',
      icon: <CreditCard size={18} />,
      emails: [
        { label: 'Administración y Finanzas', value: 'avalenzuela@policlinicotabancura.cl' },
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

function ArticleDetailView({ id, onClose }: { id: number; onClose: () => void }) {
  const activeArticle = APPS_DATA.find(app => app.id === id);
  if (!activeArticle) return null;

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
        {id === 11 ? <KlapArticleDetail /> : id === 12 ? <AnexosArticleDetail /> : null}
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
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [activeArticleId, setActiveArticleId] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

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
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeArticleId !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeArticleId]);

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
    setTimeout(() => {
      setReloadText('Actualizar Ecosistema');
      setIsReloading(false);
    }, 800);
  };

  // Filter APPS
  const filteredApps = APPS_DATA.filter((app) => {
    const matchesFilter = activeFilter === 'all' || app.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  return (
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
            <h1 className="welcome-title">Ecosistema Digital</h1>
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
        <ArticleDetailView id={activeArticleId} onClose={() => setActiveArticleId(null)} />
      ) : (
        <>
          {/* Sub-header Controls (Search and Filters) */}
          <section className="controls-section glass-panel">
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Buscar aplicación..."
                aria-label="Buscar aplicación"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="category-tabs">
              <button onClick={() => setActiveFilter('all')} className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`} data-filter="all">
                <LayoutGrid size={16} />
                Todos
              </button>
              <button onClick={() => setActiveFilter('médica')} className={`tab-btn ${activeFilter === 'médica' ? 'active' : ''}`} data-filter="médica">
                <Stethoscope size={16} />
                Área Médica
              </button>
              <button onClick={() => setActiveFilter('administrativa')} className={`tab-btn ${activeFilter === 'administrativa' ? 'active' : ''}`} data-filter="administrativa">
                <Briefcase size={16} />
                Área Administrativa
              </button>
              <button onClick={() => setActiveFilter('soporte')} className={`tab-btn ${activeFilter === 'soporte' ? 'active' : ''}`} data-filter="soporte">
                <Wrench size={16} />
                Soporte & TI
              </button>
              <button onClick={() => setActiveFilter('apis')} className={`tab-btn ${activeFilter === 'apis' ? 'active' : ''}`} data-filter="apis">
                <Cpu size={16} />
                APIs
              </button>

              <button onClick={() => setIsHelpOpen(true)} className="tab-btn help-btn" aria-label="Ayuda de categorías">
                <HelpCircle size={16} />
                Ayuda
              </button>
            </div>
          </section>

          {/* Main Grid Layout */}
          <div className="main-dashboard-grid">
            {/* LEFT column: Widgets */}
            <aside className="widgets-sidebar">
              <div className="widget-wrapper">
                <CalendarWidget />
              </div>

            </aside>

            {/* RIGHT column: App Grid */}
            <section className="apps-container">
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
                    onOpenArticle={(id) => setActiveArticleId(id)}
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
          </div>
        </div>
      </footer>

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
    </main>
  );
}
