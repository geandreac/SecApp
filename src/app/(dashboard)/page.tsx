'use client';

import { KPIS_DASHBOARD, RIOS_AMAZONAS, ALERTAS_MOCK, getTendenciaIcon } from '@/data/mock-data';
import SeasonalChart from '@/components/SeasonalChart';

export default function DashboardPage() {
  const alertasAtivos = ALERTAS_MOCK.filter(a => !a.lido).length;
  const estacoesCriticas = RIOS_AMAZONAS.filter(s => s.status === 'critico');

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Visão geral do monitoramento fluvial — Estado do Amazonas
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpis-grid">
        {KPIS_DASHBOARD.map((kpi, i) => (
          <div key={i} className="glass-card kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">
                {kpi.label}
              </span>
              <span className={`kpi-badge kpi-trend-${kpi.tendencia}`}>
                {getTendenciaIcon(kpi.tendencia)} {kpi.variacao}
              </span>
            </div>
            <div className="kpi-value-container">
              <span className="kpi-value">
                {kpi.valor}
              </span>
              <span className="kpi-unit">
                {kpi.unidade}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="main-grid">
        {/* Seasonal Chart */}
        <div className="glass-card chart-card">
          <h2 className="section-title">
            Padrão Sazonal
          </h2>
          <p className="section-subtitle">
            Nível médio mensal — comparação com média histórica (10 anos)
          </p>
          <SeasonalChart />
        </div>

        {/* Critical stations */}
        <div className="glass-card stations-card">
          <div className="section-header">
            <h2 className="section-title">Estações Críticas</h2>
            <span className="badge-critico count-badge">
              {estacoesCriticas.length} críticas
            </span>
          </div>
          <div className="stations-list">
            {RIOS_AMAZONAS.filter(s => s.status !== 'normal').map((station) => (
              <div key={station.id} className="station-item-card">
                <div className="station-header-info">
                  <span className="station-name">{station.rio_nome}</span>
                  <span className={`badge-${station.status} station-status-badge`}>
                    {station.status.toUpperCase()}
                  </span>
                </div>
                <div className="station-data-row">
                  <span className="station-city">{station.municipio}</span>
                  <span className={`station-level level-${station.status}`}>
                    {station.nivel_m}m {getTendenciaIcon(station.tendencia)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent alerts */}
      <div className="glass-card alerts-card">
        <div className="section-header">
          <h2 className="section-title">Alertas Recentes</h2>
          <span className="count-badge active-alerts-badge">
            {alertasAtivos} não lidos
          </span>
        </div>
        <div className="alerts-list">
          {ALERTAS_MOCK.slice(0, 4).map((alerta) => (
            <div key={alerta.id} className={`alert-item-card ${alerta.lido ? 'read' : 'unread'}`}>
              <div className={`alert-indicator severity-${alerta.severidade}`} />
              <div className="alert-content">
                <h3 className="alert-item-title">{alerta.titulo}</h3>
                <p className="alert-item-desc">
                  {alerta.trecho}
                </p>
                <p className="alert-item-date">
                  {new Date(alerta.criado_em).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <span className={`badge-${alerta.severidade} alert-badge`}>
                {alerta.severidade.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dashboard-header {
          margin-bottom: 24px;
        }
        .dashboard-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .dashboard-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
        }

        /* KPI grid responsividade */
        .kpis-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 24px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .kpis-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .kpi-card {
            padding: 12px 10px;
            min-width: 0;
          }
          .kpi-value {
            font-size: 22px;
          }
          .kpi-label {
            font-size: 9px;
            letter-spacing: 0.03em;
          }
          .kpi-unit {
            font-size: 10px;
          }
          .kpi-badge {
            font-size: 9px;
            padding: 2px 5px;
          }
        }
        @media (max-width: 320px) {
          .kpis-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 1200px) {
          .kpis-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .kpi-card {
          padding: 20px;
        }
        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .kpi-label {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .kpi-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 6px;
          border-radius: 6px;
        }
        .kpi-trend-subindo {
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-critico);
        }
        .kpi-trend-descendo {
          background: rgba(245, 158, 11, 0.1);
          color: var(--color-alerta);
        }
        .kpi-trend-estavel {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-normal);
        }
        .kpi-value-container {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .kpi-value {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .kpi-unit {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Layout Grid Principal */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        @media (min-width: 1200px) {
          .main-grid {
            grid-template-columns: 1fr 380px;
          }
        }

        .chart-card {
          padding: 20px;
          max-width: 100%;
          overflow: hidden;
        }
        .stations-card, .alerts-card {
          padding: 20px;
          max-width: 100%;
        }
        @media (max-width: 640px) {
          .chart-card, .stations-card, .alerts-card {
            padding: 14px;
          }
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .section-subtitle {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .count-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }
        .active-alerts-badge {
          background: rgba(239, 68, 68, 0.15);
          color: var(--color-critico);
        }

        .stations-list, .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .station-item-card {
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid var(--border-subtle);
          transition: background 0.2s, border-color 0.2s;
        }
        .station-header-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .station-name {
          font-size: 13px;
          font-weight: 700;
        }
        .station-status-badge {
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
        }
        .station-data-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        .station-city {
          color: var(--text-muted);
        }
        .station-level {
          font-weight: 700;
        }
        .level-critico { color: var(--color-critico); }
        .level-alto { color: var(--color-alto); }
        .level-moderado { color: var(--color-alerta); }

        .alert-item-card {
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
          display: flex;
          gap: 12px;
          align-items: flex-start;
          transition: background 0.2s;
        }
        .alert-item-card.unread {
          background: rgba(14, 165, 233, 0.025);
          border-color: rgba(14, 165, 233, 0.12);
        }
        .alert-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .severity-critico { background: var(--color-critico); }
        .severity-alto { background: var(--color-alto); }
        .severity-moderado { background: var(--color-alerta); }
        .severity-normal { background: var(--color-normal); }

        .alert-content {
          flex: 1;
        }
        .alert-item-title {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 2px;
          line-height: 1.4;
        }
        .alert-item-desc {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .alert-item-date {
          font-size: 11px;
          color: var(--text-muted);
        }
        .alert-badge {
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* Mobile specific header adjustment */
        @media (max-width: 1024px) {
          .dashboard-title {
            font-size: 22px;
          }
          .dashboard-subtitle {
            font-size: 13px;
          }
        }
        @media (max-width: 640px) {
          .dashboard-header {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}
