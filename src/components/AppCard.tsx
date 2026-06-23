import React from 'react';

interface AppCardProps {
  id?: number;
  name: string;
  description: string;
  url?: string;
  status: 'online' | 'maintenance' | 'offline' | 'dev';
  category: string;
  metric?: string;
  metricLabel?: string;
  icon?: React.ReactNode;
  isArticle?: boolean;
  onOpenArticle?: (id: number) => void;
}

export default function AppCard({
  id,
  name,
  description,
  url,
  status,
  category,
  metric,
  metricLabel,
  icon,
  isArticle,
  onOpenArticle,
}: AppCardProps) {
  const statusText = {
    online: 'Operativo',
    maintenance: 'Mantenimiento',
    offline: 'Inactivo',
    dev: 'En desarrollo',
  }[status];

  const isDev = status === 'dev';
  const isCardDisabled = isDev && (isArticle || url);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isCardDisabled) {
      e.preventDefault();
      return;
    }
    if (isArticle && id && onOpenArticle) {
      e.preventDefault();
      onOpenArticle(id);
    }
  };

  const content = (
    <>
      <div className="card-header">
        <div className="icon-container">
          {icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
          )}
        </div>
        <span className={`status-badge ${status}`}>
          {status !== 'online' && status !== 'dev' && statusText}
        </span>
      </div>

      <div className="card-body">
        <span className="category-tag">{category}</span>
        <h3 className="app-title">{name}</h3>
        <p className="app-description">{description}</p>
      </div>

      {metric && (
        <div className="card-footer">
          <div className="metric-container">
            <span className="metric-value">
              {isCardDisabled ? "Próximamente" : (isArticle ? "Leer" : (url ? "Visitar" : metric))}
            </span>
            <span className="metric-label">{metricLabel}</span>
          </div>
          {url && !isCardDisabled && (
            <div className="arrow-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          )}
        </div>
      )}
    </>
  );

  if (isCardDisabled || isArticle) {
    return (
      <div
        onClick={isCardDisabled ? undefined : handleCardClick}
        className={`app-card glass-panel ${isCardDisabled ? '' : 'glow-card article-card-trigger'}`}
        data-category={category.toLowerCase()}
        data-name={name.toLowerCase()}
        data-desc={description.toLowerCase()}
        style={{ 
          cursor: isCardDisabled ? 'not-allowed' : 'pointer',
          opacity: isCardDisabled ? 0.6 : 1 
        }}
      >
        {content}
      </div>
    );
  }

  if (!url) {
    return (
      <div
        className="app-card glass-panel glow-card no-link"
        data-category={category.toLowerCase()}
        data-name={name.toLowerCase()}
        data-desc={description.toLowerCase()}
        style={{ cursor: 'default' }}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="app-card glass-panel glow-card"
      data-category={category.toLowerCase()}
      data-name={name.toLowerCase()}
      data-desc={description.toLowerCase()}
    >
      {content}
    </a>
  );
}
