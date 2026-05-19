'use client';

import SeasonalChart from '@/components/SeasonalChart';
import { RIOS_AMAZONAS, DADOS_HISTORICOS } from '@/data/mock-data';

export default function HistoricoPage() {
  const totalEstacoes = RIOS_AMAZONAS.length;
  const criticas = RIOS_AMAZONAS.filter(s => s.status === 'critico').length;
  const emAlerta = RIOS_AMAZONAS.filter(s => s.status === 'alerta').length;
  const normais = RIOS_AMAZONAS.filter(s => s.status === 'normal').length;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="historico-header">
        <h1 className="historico-title">
          Histórico Sazonal
        </h1>
        <p className="historico-subtitle">
          Padrão histórico de seca por rio e mês — últimos 10 anos
        </p>
      </div>

      {/* Status Summary Grid */}
      <div className="summary-grid">
        {[
          { label: 'Estações', valor: totalEstacoes, color: '#0ea5e9' },
          { label: 'Normais', valor: normais, color: '#22c55e' },
          { label: 'Em Alerta', valor: emAlerta, color: '#f59e0b' },
          { label: 'Críticas', valor: criticas, color: '#ef4444' },
        ].map((item, i) => (
          <div key={i} className="glass-card summary-card">
            <div className="summary-value" style={{ color: item.color }}>
              {item.valor}
            </div>
            <div className="summary-label">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div className="glass-card chart-card">
        <h2 className="section-title">
          Comparação Sazonal
        </h2>
        <p className="section-subtitle">
          Selecione o rio para comparar o nível atual com a média histórica. A linha vermelha indica o limiar crítico.
        </p>
        <SeasonalChart />
      </div>

      {/* Período crítico info (Table with scroll indicator) */}
      <div className="glass-card table-card">
        <h2 className="section-title">
          Calendário de Risco por Rio
        </h2>
        <p className="section-subtitle">
          Período crítico baseado no histórico de 10 anos. Cores indicam meses com maior risco de restrição de calado.
        </p>
        
        {/* Mobile scroll-x helper message */}
        <div className="mobile-scroll-tip">
          <span>👈 Arraste para o lado para ver todos os meses 👉</span>
        </div>

        <div className="table-responsive-wrapper scroll-x-indicator">
          <table className="historical-table">
            <thead>
              <tr>
                <th className="th-rio">Rio</th>
                {DADOS_HISTORICOS.meses.map(m => (
                  <th key={m} className="th-mes">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(DADOS_HISTORICOS.rios).map(([rio, dados]) => (
                <tr key={rio}>
                  <td className="td-rio">{rio}</td>
                  {dados.media_10_anos.map((nivel, i) => {
                    const diff = nivel - dados.limiar_critico;
                    let bg = 'rgba(34, 197, 94, 0.12)';
                    let clr = '#22c55e';
                    if (diff < 0) { bg = 'rgba(239, 68, 68, 0.18)'; clr = '#ef4444'; }
                    else if (diff < 4) { bg = 'rgba(249, 115, 22, 0.15)'; clr = '#f97316'; }
                    else if (diff < 8) { bg = 'rgba(245, 158, 11, 0.12)'; clr = '#f59e0b'; }
                    return (
                      <td key={i} className="td-mes-cell">
                        <div className="level-badge" style={{ background: bg, color: clr }}>
                          {nivel.toFixed(0)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info sections */}
      <div className="glass-card info-card">
        <h2 className="section-title" style={{ marginBottom: 20 }}>
          Sobre o Padrão Sazonal
        </h2>
        <div className="info-grid">
          <div className="info-block">
            <h3 className="info-block-title">Ciclo Hidrológico</h3>
            <p className="info-block-text">
              O nível dos rios na Amazônia segue padrão sazonal previsível: subida entre dezembro-maio (período de cheia) e descida entre junho-novembro (período de seca). O pico crítico ocorre entre <strong>agosto e novembro</strong>.
            </p>
          </div>
          <div className="info-block">
            <h3 className="info-block-title">Impacto Logístico</h3>
            <p className="info-block-text">
              A redução do calado impacta diretamente a navegação fluvial: embarcações ficam impossibilitadas de navegar, gerando <strong>atrasos de 12-14 dias</strong> em entregas, aumento de até <strong>30% no custo logístico</strong>, e risco de encalhe.
            </p>
          </div>
          <div className="info-block">
            <h3 className="info-block-title">Fontes de Dados</h3>
            <p className="info-block-text">
              Dados históricos coletados da ANA (Agência Nacional de Águas), INMET (Instituto Nacional de Meteorologia), Porto de Manaus e SACE (Sistema de Alerta de Eventos Críticos do Serviço Geológico do Brasil).
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .historico-header {
          margin-bottom: 24px;
        }
        .historico-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .historico-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
        }

        /* Summary Grid */
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 24px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 768px) {
          .summary-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .summary-card {
          padding: 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .summary-card {
            padding: 12px 8px;
          }
          .summary-value {
            font-size: 22px;
          }
          .summary-label {
            font-size: 10px;
          }
        }
        .summary-value {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 2px;
        }
        .summary-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .chart-card, .info-card {
          padding: 20px;
          margin-bottom: 24px;
        }
        .table-card {
          padding: 20px;
          margin-bottom: 24px;
          max-width: 100%;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .chart-card, .table-card, .info-card {
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

        /* Dica de rolagem lateral móvel */
        .mobile-scroll-tip {
          display: none;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 12px;
        }
        @media (max-width: 768px) {
          .mobile-scroll-tip {
            display: block;
          }
        }

        /* Tabela Responsiva Estilizada */
        .table-responsive-wrapper {
          overflow-x: auto;
          width: 100%;
          margin: 0 -16px;
          padding: 0 16px;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 640px) {
          .table-responsive-wrapper {
            margin: 0 -14px;
            padding: 0 14px;
          }
        }
        @media (min-width: 768px) {
          .table-responsive-wrapper {
            margin: 0;
            padding: 0;
            width: 100%;
          }
        }

        .historical-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 850px; /* Garante que os meses caibam perfeitamente na rolagem */
        }
        .th-rio {
          padding: 10px 16px;
          text-align: left;
          color: var(--text-secondary);
          font-weight: 700;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .th-mes {
          padding: 10px 8px;
          text-align: center;
          color: var(--text-secondary);
          font-weight: 600;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 11px;
        }
        .td-rio {
          padding: 12px 16px;
          font-weight: 700;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-subtle);
          white-space: nowrap;
        }
        .td-mes-cell {
          padding: 8px 4px;
          text-align: center;
          border-bottom: 1px solid var(--border-subtle);
        }
        .level-badge {
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
          min-width: 28px;
        }

        /* Grid de Informações de rodapé */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .info-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .info-block {
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-subtle);
        }
        .info-block-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--color-primary-light);
        }
        .info-block-text {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .historico-title {
            font-size: 22px;
          }
          .historico-subtitle {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
