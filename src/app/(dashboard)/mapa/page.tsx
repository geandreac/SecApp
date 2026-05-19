'use client';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function MapaPage() {
  return (
    <div className="page-container mapa-page-container">
      {/* Header */}
      <div className="mapa-header">
        <h1 className="mapa-title">
          Mapa Fluvial
        </h1>
        <p className="mapa-subtitle">
          Monitoramento de calado em tempo real — estações do Amazonas
        </p>
      </div>

      {/* Legend */}
      <div className="glass-card legend-card">
        <span className="legend-label">Severidade:</span>
        <div className="legend-items">
          {[
            { color: '#22c55e', label: 'Normal' },
            { color: '#f59e0b', label: 'Alerta' },
            { color: '#ef4444', label: 'Crítico' },
          ].map(({ color, label }) => (
            <div key={label} className="legend-item">
              <div 
                className="legend-bullet"
                style={{
                  background: color,
                  boxShadow: `0 0 8px ${color}66`,
                }} 
              />
              <span className="legend-item-text">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map container */}
      <div className="glass-card map-container-wrapper">
        <MapView />
      </div>

      <style>{`
        .mapa-header {
          margin-bottom: 16px;
        }
        .mapa-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .mapa-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
        }

        /* Legenda Responsiva */
        .legend-card {
          padding: 12px 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .legend-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .legend-items {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legend-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .legend-item-text {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Container do Mapa Altura Inteligente */
        .map-container-wrapper {
          height: calc(100vh - 240px);
          min-height: 460px;
          overflow: hidden;
          padding: 0;
          border-radius: 16px;
        }

        @media (max-width: 1024px) {
          .mapa-title {
            font-size: 22px;
          }
          .mapa-subtitle {
            font-size: 13px;
          }
          .map-container-wrapper {
            height: calc(100vh - 230px);
            min-height: 400px;
          }
        }

        @media (max-width: 640px) {
          .legend-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .legend-items {
            width: 100%;
            justify-content: space-between;
          }
          .map-container-wrapper {
            height: calc(100vh - 250px);
            min-height: 380px;
          }
        }
      `}</style>
    </div>
  );
}
