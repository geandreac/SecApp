'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { DADOS_HISTORICOS } from '@/data/mock-data';

Chart.register(...registerables);

const RIO_OPTIONS = Object.keys(DADOS_HISTORICOS.rios);

export default function SeasonalChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [selectedRio, setSelectedRio] = useState('Rio Negro');

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const rio = DADOS_HISTORICOS.rios[selectedRio as keyof typeof DADOS_HISTORICOS.rios];

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: DADOS_HISTORICOS.meses,
        datasets: [
          {
            label: 'Média 10 anos',
            data: rio.media_10_anos,
            borderColor: '#94a3b8',
            backgroundColor: 'rgba(148, 163, 184, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#94a3b8',
          },
          {
            label: '2026 (atual)',
            data: rio.ano_atual,
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#0ea5e9',
          },
          {
            label: 'Limiar Crítico',
            data: Array(12).fill(rio.limiar_critico),
            borderColor: '#ef4444',
            borderWidth: 2,
            borderDash: [8, 4],
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { family: 'Inter', size: 12 },
              padding: 16,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f1f5f9',
            bodyColor: '#94a3b8',
            borderColor: 'rgba(148, 163, 184, 0.2)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            titleFont: { family: 'Inter', weight: 600 as const },
            bodyFont: { family: 'Inter' },
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y?.toFixed(1) ?? '—'}m`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(148, 163, 184, 0.06)' },
            ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
          },
          y: {
            grid: { color: 'rgba(148, 163, 184, 0.06)' },
            ticks: {
              color: '#64748b',
              font: { family: 'Inter', size: 11 },
              callback: (v) => `${v}m`,
            },
          },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, [selectedRio]);

  return (
    <div>
      {/* Rio selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {RIO_OPTIONS.map((rio) => (
          <button
            key={rio}
            onClick={() => setSelectedRio(rio)}
            style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500,
              border: '1px solid',
              cursor: 'pointer', transition: 'all 0.2s',
              ...(selectedRio === rio ? {
                background: 'rgba(14, 165, 233, 0.15)',
                borderColor: 'rgba(14, 165, 233, 0.4)',
                color: '#38bdf8',
              } : {
                background: 'transparent',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-muted)',
              }),
            }}
          >
            {rio}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="chart-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
