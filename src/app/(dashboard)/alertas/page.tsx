'use client';

import { useState } from 'react';
import { ALERTAS_MOCK, formatDate } from '@/data/mock-data';

const SEVERITY_ORDER = { critico: 0, alto: 1, moderado: 2, info: 3 };
const TIPO_LABELS: Record<string, string> = {
  calado: 'Calado',
  seca: 'Seca',
  encalhe: 'Encalhe',
  abastecimento: 'Abastecimento',
};

export default function AlertasPage() {
  const [alertas, setAlertas] = useState(ALERTAS_MOCK);
  const [filtroSeveridade, setFiltroSeveridade] = useState<string | null>(null);

  const sorted = [...alertas]
    .filter(a => !filtroSeveridade || a.severidade === filtroSeveridade)
    .sort((a, b) => {
      if (a.lido !== b.lido) return a.lido ? 1 : -1;
      return SEVERITY_ORDER[a.severidade as keyof typeof SEVERITY_ORDER]
        - SEVERITY_ORDER[b.severidade as keyof typeof SEVERITY_ORDER];
    });

  const marcarComoLido = (id: string) => {
    setAlertas(prev => prev.map(a => a.id === id ? { ...a, lido: true } : a));
  };

  const marcarTodosLidos = () => {
    setAlertas(prev => prev.map(a => ({ ...a, lido: true })));
  };

  const naoLidos = alertas.filter(a => !a.lido).length;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="alerts-header-wrapper">
        <div className="alerts-title-block">
          <h1 className="alerts-title">Alertas</h1>
          <p className="alerts-subtitle">
            {naoLidos} alertas não lidos · Histórico de 90 dias
          </p>
        </div>
        <button
          onClick={marcarTodosLidos}
          className="mark-all-read-btn touch-target"
        >
          Marcar todos como lidos
        </button>
      </div>

      {/* Filter Row (Smooth Scroll on Mobile) */}
      <div className="filters-outer-container">
        <div className="filters-scroll-container">
          {[null, 'critico', 'alto', 'moderado', 'info'].map((sev) => (
            <button
              key={sev ?? 'all'}
              onClick={() => setFiltroSeveridade(sev)}
              className={`filter-btn ${filtroSeveridade === sev ? 'active' : ''}`}
            >
              {sev ? sev.charAt(0).toUpperCase() + sev.slice(1) : 'Todos'}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="alerts-list-container">
        {sorted.map((alerta) => (
          <div
            key={alerta.id}
            className={`glass-card alert-card-item ${alerta.lido ? 'read' : 'unread'}`}
            style={{
              borderLeft: `4px solid ${
                alerta.severidade === 'critico' ? 'var(--color-critico)'
                : alerta.severidade === 'alto' ? 'var(--color-alto)'
                : alerta.severidade === 'moderado' ? 'var(--color-alerta)'
                : 'var(--color-normal)'
              }`,
            }}
          >
            <div className="alert-card-header">
              <div className="alert-badges-row">
                <span className={`badge-${alerta.severidade} alert-card-badge`}>
                  {alerta.severidade.toUpperCase()}
                </span>
                <span className="badge-type">
                  {TIPO_LABELS[alerta.tipo]}
                </span>
                {!alerta.lido && (
                  <span className="unread-dot" />
                )}
              </div>
            </div>

            <h3 className="alert-card-title">
              {alerta.titulo}
            </h3>
            
            <p className="alert-card-desc">
              {alerta.descricao}
            </p>

            <div className="alert-action-box">
              <span className="alert-action-title">
                Ação Recomendada
              </span>
              <p className="alert-action-text">
                {alerta.acao_recomendada}
              </p>
            </div>

            <div className="alert-card-footer">
              <div className="alert-meta-info">
                <span>{alerta.trecho}</span>
                <span className="meta-separator">·</span>
                <span>{formatDate(alerta.criado_em)}</span>
              </div>
              {!alerta.lido && (
                <button
                  onClick={() => marcarComoLido(alerta.id)}
                  className="mark-single-read-btn touch-target"
                >
                  Marcar como lido
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .alerts-header-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }
        .alerts-title-block {
          flex: 1;
          min-width: 240px;
        }
        .alerts-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .alerts-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
        }
        .mark-all-read-btn {
          background: rgba(14, 165, 233, 0.1);
          color: #38bdf8;
          border: 1px solid rgba(14, 165, 233, 0.2);
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        @media (hover: hover) {
          .mark-all-read-btn:hover {
            background: rgba(14, 165, 233, 0.18);
            border-color: rgba(14, 165, 233, 0.35);
          }
        }
        @media (max-width: 640px) {
          .mark-all-read-btn {
            width: 100%;
            text-align: center;
          }
        }

        /* Container de filtros rolável para mobile */
        .filters-outer-container {
          margin: 0 -16px 20px -16px;
          padding: 0 16px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .filters-outer-container {
            margin: 0 0 24px 0;
            padding: 0;
          }
        }
        .filters-scroll-container {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
        }
        .filters-scroll-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar for a touch-friendly slider look */
        }
        .filter-btn {
          flex-shrink: 0;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
        }
        .filter-btn.active {
          background: rgba(14, 165, 233, 0.12);
          border-color: rgba(14, 165, 233, 0.35);
          color: #38bdf8;
        }

        .alerts-list-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .alert-card-item {
          padding: 20px;
          transition: opacity 0.3s, transform 0.2s;
        }
        .alert-card-item.read {
          opacity: 0.65;
        }
        .alert-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .alert-badges-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .alert-card-badge {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
        }
        .badge-type {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          background: rgba(148, 163, 184, 0.08);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
        }
        .unread-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
          box-shadow: 0 0 8px rgba(14, 165, 233, 0.6);
        }

        .alert-card-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .alert-card-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .alert-action-box {
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(14, 165, 233, 0.025);
          border: 1px solid rgba(14, 165, 233, 0.06);
          margin-bottom: 16px;
        }
        .alert-action-title {
          font-size: 11px;
          font-weight: 700;
          color: #38bdf8;
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .alert-action-text {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .alert-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 12px;
        }
        .alert-meta-info {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }
        .meta-separator {
          color: rgba(148, 163, 184, 0.3);
        }
        .mark-single-read-btn {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-default);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        @media (hover: hover) {
          .mark-single-read-btn:hover {
            background: rgba(255, 255, 255, 0.03);
            border-color: var(--text-muted);
            color: var(--text-primary);
          }
        }
        @media (max-width: 640px) {
          .alert-card-footer {
            flex-direction: column;
            align-items: stretch;
          }
          .alert-meta-info {
            order: 2;
          }
          .mark-single-read-btn {
            order: 1;
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 1024px) {
          .alerts-title {
            font-size: 22px;
          }
          .alerts-subtitle {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
