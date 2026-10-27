'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Globe,
  HelpCircle,
  ExternalLink,
  Save,
  X,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

interface PortalAppRecord {
  id: number;
  name: string;
  description: string;
  url: string | null;
  slug: string | null;
  status: 'online' | 'maintenance' | 'offline' | 'dev';
  category: string;
  metric: string | null;
  metric_label: string | null;
  is_article: boolean;
  icon_type: string;
  display_order: number;
  help_info: any;
  is_active: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [apps, setApps] = useState<PortalAppRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingApp, setEditingApp] = useState<PortalAppRecord | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states for create/edit
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    slug: '',
    status: 'online' as 'online' | 'maintenance' | 'offline' | 'dev',
    category: 'Administrativa',
    metric: '',
    metric_label: '',
    is_article: false,
    icon_type: 'globe',
    display_order: 0,
    is_active: true,
    // Help info fields
    help_title: '',
    help_description: '',
    help_steps: '',
    help_contact_name: '',
    help_contact_phone: '',
    help_contact_email: '',
    help_notes: '',
    help_guide_url: '',
  });

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadApps();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        loadApps();
      } else {
        setLoginError(data.message || 'Contraseña inválida');
      }
    } catch (err: any) {
      setLoginError('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' });
    setIsAuthenticated(false);
    setPassword('');
  };

  const loadApps = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/apps?all=true');
      const data = await res.json();
      if (data.success) {
        setApps(data.data);
      }
    } catch (err: any) {
      notify('error', 'Error al cargar tarjetas de la base de datos');
    } finally {
      setIsLoading(false);
    }
  };

  const notify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  const openEditModal = (app: PortalAppRecord) => {
    setEditingApp(app);
    setIsCreatingNew(false);
    const help = app.help_info || {};
    setFormData({
      name: app.name || '',
      description: app.description || '',
      url: app.url || '',
      slug: app.slug || '',
      status: app.status || 'online',
      category: app.category || 'Administrativa',
      metric: app.metric || '',
      metric_label: app.metric_label || '',
      is_article: Boolean(app.is_article),
      icon_type: app.icon_type || 'globe',
      display_order: app.display_order || 0,
      is_active: app.is_active !== undefined ? app.is_active : true,
      help_title: help.title || '',
      help_description: help.description || '',
      help_steps: Array.isArray(help.steps) ? help.steps.join('\n') : '',
      help_contact_name: help.contactName || '',
      help_contact_phone: help.contactPhone || '',
      help_contact_email: help.contactEmail || '',
      help_notes: help.notes || '',
      help_guide_url: help.guideUrl || '',
    });
  };

  const openCreateModal = () => {
    setEditingApp(null);
    setIsCreatingNew(true);
    setFormData({
      name: '',
      description: '',
      url: '',
      slug: '',
      status: 'online',
      category: 'Administrativa',
      metric: '',
      metric_label: '',
      is_article: false,
      icon_type: 'globe',
      display_order: apps.length + 1,
      is_active: true,
      help_title: '',
      help_description: '',
      help_steps: '',
      help_contact_name: '',
      help_contact_phone: '',
      help_contact_email: '',
      help_notes: '',
      help_guide_url: '',
    });
  };

  const handleSaveApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const stepsArray = formData.help_steps
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const hasHelp =
      formData.help_title ||
      formData.help_description ||
      stepsArray.length > 0 ||
      formData.help_contact_name ||
      formData.help_contact_phone ||
      formData.help_contact_email;

    const help_info = hasHelp
      ? {
          title: formData.help_title || undefined,
          description: formData.help_description || undefined,
          steps: stepsArray.length > 0 ? stepsArray : undefined,
          contactName: formData.help_contact_name || undefined,
          contactPhone: formData.help_contact_phone || undefined,
          contactEmail: formData.help_contact_email || undefined,
          notes: formData.help_notes || undefined,
          guideUrl: formData.help_guide_url || undefined,
        }
      : null;

    const payload = {
      id: editingApp?.id,
      name: formData.name,
      description: formData.description,
      url: formData.url,
      slug: formData.slug,
      status: formData.status,
      category: formData.category,
      metric: formData.metric,
      metric_label: formData.metric_label,
      is_article: formData.is_article,
      icon_type: formData.icon_type,
      display_order: Number(formData.display_order),
      is_active: formData.is_active,
      help_info,
    };

    try {
      const url = '/api/apps';
      const method = isCreatingNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        notify('success', isCreatingNew ? 'Tarjeta creada exitosamente' : 'Tarjeta actualizada');
        setEditingApp(null);
        setIsCreatingNew(false);
        loadApps();
      } else {
        notify('error', data.message || 'Error al guardar');
      }
    } catch {
      notify('error', 'Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteApp = async (id: number, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la tarjeta "${name}"?`)) return;

    try {
      const res = await fetch(`/api/apps?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        notify('success', 'Tarjeta eliminada');
        loadApps();
      } else {
        notify('error', data.message || 'No se pudo eliminar');
      }
    } catch {
      notify('error', 'Error al eliminar');
    }
  };

  const handleToggleActive = async (app: PortalAppRecord) => {
    try {
      const res = await fetch('/api/apps', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...app,
          is_active: !app.is_active,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        notify('success', app.is_active ? 'Tarjeta ocultada' : 'Tarjeta activada');
        loadApps();
      }
    } catch {
      notify('error', 'Error al cambiar estado');
    }
  };

  // 1. Cargando estado de sesión inicial
  if (isAuthenticated === null) {
    return (
      <div className="admin-loading-screen">
        <RefreshCw className="spin-icon" size={32} />
        <p>Cargando panel de administración...</p>
      </div>
    );
  }

  // 2. Formulario de Login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card glass-panel">
          <div className="login-header">
            <div className="login-icon-box">
              <Lock size={28} />
            </div>
            <h2>Acceso Administrador</h2>
            <p>Portal Policlínico Tabancura</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="admin-pass">Contraseña de Administrador</label>
              <input
                id="admin-pass"
                type="password"
                placeholder="Ingresa la contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>

            {loginError && (
              <div className="login-error-msg">
                <AlertTriangle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="admin-primary-btn">
              {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            <Link href="/" className="back-link">
              <ArrowLeft size={14} /> Volver al Portal de Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Panel Administrador Logueado
  return (
    <div className="admin-dashboard-layout">
      {/* Barra superior de administración */}
      <header className="admin-topbar glass-panel">
        <div className="topbar-left">
          <Link href="/" className="topbar-brand">
            <ArrowLeft size={16} />
            <span>Volver al Portal</span>
          </Link>
          <div className="admin-badge">Panel de Control TI (db_ti)</div>
        </div>

        <div className="topbar-right">
          <button onClick={openCreateModal} className="admin-create-btn">
            <Plus size={16} />
            <span>Nueva Tarjeta</span>
          </button>
          <button onClick={handleLogout} className="admin-logout-btn" title="Cerrar sesión">
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* Notificación flotante */}
      {notification && (
        <div className={`admin-notification ${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Contenido principal */}
      <main className="admin-main-container">
        <div className="admin-header-row">
          <div>
            <h1>Gestión de Tarjetas y Sistemas</h1>
            <p>Configura los nombres, URLs, estados operativos, categorías y las ventanas de ayuda para cada card.</p>
          </div>
          <button onClick={loadApps} className="admin-refresh-btn" disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? 'spin-icon' : ''} />
            <span>Actualizar lista</span>
          </button>
        </div>

        {/* Tabla de tarjetas */}
        <div className="admin-table-wrapper glass-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Orden</th>
                <th>Nombre y URL</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Ayuda</th>
                <th>Visibilidad</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {apps.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                    {isLoading ? 'Cargando tarjetas...' : 'No hay tarjetas registradas en db_ti'}
                  </td>
                </tr>
              ) : (
                apps.map((app) => (
                  <tr key={app.id} className={!app.is_active ? 'row-inactive' : ''}>
                    <td>
                      <span className="order-badge">#{app.display_order}</span>
                    </td>
                    <td>
                      <div className="app-cell-name">
                        <strong>{app.name}</strong>
                        {app.is_article && <span className="cell-pill article">Artículo</span>}
                      </div>
                      {app.url ? (
                        <a href={app.url} target="_blank" rel="noopener noreferrer" className="app-cell-url">
                          {app.url} <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="app-cell-no-url">Sin URL externa</span>
                      )}
                    </td>
                    <td>
                      <span className={`category-pill cat-${app.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
                        {app.category}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${app.status}`}>
                        {app.status === 'online' && 'Operativo'}
                        {app.status === 'dev' && 'En desarrollo'}
                        {app.status === 'maintenance' && 'Mantenimiento'}
                        {app.status === 'offline' && 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      {app.help_info ? (
                        <span className="help-indicator has-help" title="Tiene ventana de ayuda configurada">
                          <HelpCircle size={15} /> Configurada
                        </span>
                      ) : (
                        <span className="help-indicator no-help">Sin ayuda</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleActive(app)}
                        className={`visibility-toggle ${app.is_active ? 'active' : 'hidden'}`}
                        title={app.is_active ? 'Hacer clic para ocultar' : 'Hacer clic para mostrar'}
                      >
                        {app.is_active ? <Eye size={15} /> : <EyeOff size={15} />}
                        <span>{app.is_active ? 'Visible' : 'Oculto'}</span>
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions">
                        <button
                          onClick={() => openEditModal(app)}
                          className="action-btn edit"
                          title="Editar tarjeta"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteApp(app.id, app.name)}
                          className="action-btn delete"
                          title="Eliminar tarjeta"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de Crear / Editar Tarjeta */}
      {(editingApp || isCreatingNew) && (
        <div className="admin-modal-overlay" onClick={() => { setEditingApp(null); setIsCreatingNew(false); }}>
          <div className="admin-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isCreatingNew ? 'Crear Nueva Tarjeta de Sistema' : `Editar: ${editingApp?.name}`}</h3>
              <button
                className="modal-close-btn"
                onClick={() => { setEditingApp(null); setIsCreatingNew(false); }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveApp} className="admin-form">
              <div className="form-sections-grid">
                {/* Columna 1: Información General */}
                <div className="form-column">
                  <h4 className="column-title">1. Información de la Tarjeta</h4>

                  <div className="form-group">
                    <label>Nombre del Sistema *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Dentalink / Validador Bono"
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripción corta *</label>
                    <textarea
                      required
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Breve resumen de la función de este sistema..."
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Categoría</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Administrativa">Administrativa</option>
                        <option value="Médica">Médica</option>
                        <option value="Soporte">Soporte</option>
                        <option value="APIs">APIs</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Estado del Servicio</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      >
                        <option value="online">Operativo (Online)</option>
                        <option value="dev">En Desarrollo (Dev)</option>
                        <option value="maintenance">Mantenimiento</option>
                        <option value="offline">Inactivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>URL de Destino</label>
                      <input
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://... o /ruta"
                      />
                    </div>

                    <div className="form-group">
                      <label>Orden de Aparición</label>
                      <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Métrica / Etiqueta Valor</label>
                      <input
                        type="text"
                        value={formData.metric}
                        onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                        placeholder="Ej: 99.98% / v2.0 / Mi Vita"
                      />
                    </div>

                    <div className="form-group">
                      <label>Subtítulo de Métrica</label>
                      <input
                        type="text"
                        value={formData.metric_label}
                        onChange={(e) => setFormData({ ...formData, metric_label: e.target.value })}
                        placeholder="Ej: Disponibilidad / Acceso TI"
                      />
                    </div>
                  </div>

                  <div className="form-checkboxes">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      />
                      <span>Tarjeta Visible en el Portal</span>
                    </label>

                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.is_article}
                        onChange={(e) => setFormData({ ...formData, is_article: e.target.checked })}
                      />
                      <span>Es un Artículo / Manual Interno</span>
                    </label>
                  </div>
                </div>

                {/* Columna 2: Popup de Ayuda */}
                <div className="form-column help-section-column">
                  <h4 className="column-title">2. Contenido de Ayuda (Popup)</h4>
                  <p className="column-desc">
                    Estos datos se mostrarán cuando el usuario pulse el botón <strong>&quot;Ayuda&quot;</strong> en la card.
                  </p>

                  <div className="form-group">
                    <label>Título del Problema / Ayuda</label>
                    <input
                      type="text"
                      value={formData.help_title}
                      onChange={(e) => setFormData({ ...formData, help_title: e.target.value })}
                      placeholder="Ej: ¿Problemas con el POS Klap?"
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripción del Problema</label>
                    <textarea
                      rows={2}
                      value={formData.help_description}
                      onChange={(e) => setFormData({ ...formData, help_description: e.target.value })}
                      placeholder="Ej: Si el terminal está pegado o el pago quedó pendiente..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Pasos de Solución (1 paso por línea)</label>
                    <textarea
                      rows={4}
                      value={formData.help_steps}
                      onChange={(e) => setFormData({ ...formData, help_steps: e.target.value })}
                      placeholder="1. Paso uno&#10;2. Paso dos&#10;3. Paso tres"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Nombre Encargado / Área</label>
                      <input
                        type="text"
                        value={formData.help_contact_name}
                        onChange={(e) => setFormData({ ...formData, help_contact_name: e.target.value })}
                        placeholder="Ej: Andrea Palma / Soporte TI"
                      />
                    </div>

                    <div className="form-group">
                      <label>Teléfono o Anexo</label>
                      <input
                        type="text"
                        value={formData.help_contact_phone}
                        onChange={(e) => setFormData({ ...formData, help_contact_phone: e.target.value })}
                        placeholder="Ej: Anexo 219 / +56 9..."
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Email de Soporte</label>
                      <input
                        type="email"
                        value={formData.help_contact_email}
                        onChange={(e) => setFormData({ ...formData, help_contact_email: e.target.value })}
                        placeholder="soporte@policlinicotabancura.cl"
                      />
                    </div>

                    <div className="form-group">
                      <label>URL a Manual / Protocolo</label>
                      <input
                        type="text"
                        value={formData.help_guide_url}
                        onChange={(e) => setFormData({ ...formData, help_guide_url: e.target.value })}
                        placeholder="/soporte-klap"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Nota aclaratoria / Horario</label>
                    <input
                      type="text"
                      value={formData.help_notes}
                      onChange={(e) => setFormData({ ...formData, help_notes: e.target.value })}
                      placeholder="Ej: Para cambios de usuarios contactar a RRHH."
                    />
                  </div>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  onClick={() => { setEditingApp(null); setIsCreatingNew(false); }}
                  className="admin-cancel-btn"
                >
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} className="admin-primary-btn">
                  <Save size={16} />
                  <span>{isSubmitting ? 'Guardando en db_ti...' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
