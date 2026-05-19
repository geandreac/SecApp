'use client';

import { useSyncExternalStore } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RIOS_AMAZONAS, getTendenciaIcon, formatDate } from '@/data/mock-data';

const STATUS_COLORS: Record<string, string> = {
  normal: '#22c55e',
  alerta: '#f59e0b',
  critico: '#ef4444',
};

function useIsMounted() {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

export default function MapView() {
  const mounted = useIsMounted();
  if (!mounted) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>Carregando mapa...</div>;

  return (
    <MapContainer
      center={[-3.5, -63.0]}
      zoom={6}
      style={{ height: '100%', width: '100%', borderRadius: 16 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />
      {RIOS_AMAZONAS.map((station) => (
        <CircleMarker
          key={station.id}
          center={[station.latitude, station.longitude]}
          radius={station.status === 'critico' ? 14 : station.status === 'alerta' ? 11 : 8}
          pathOptions={{
            fillColor: STATUS_COLORS[station.status],
            fillOpacity: 0.7,
            color: STATUS_COLORS[station.status],
            weight: 2,
            opacity: 0.9,
          }}
        >
          <Popup>
            <div style={{ minWidth: 220, fontFamily: 'Inter, sans-serif' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                  {station.rio_nome}
                </h3>
                <span style={{
                  padding: '2px 8px', borderRadius: 12, fontSize: 10,
                  fontWeight: 700, textTransform: 'uppercase',
                  background: `${STATUS_COLORS[station.status]}22`,
                  color: STATUS_COLORS[station.status],
                  border: `1px solid ${STATUS_COLORS[station.status]}44`,
                }}>
                  {station.status}
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 12px' }}>
                📍 {station.municipio} — Estação {station.estacao_id}
              </p>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
                padding: '12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)',
              }}>
                <div>
                  <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>Nível Atual</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>
                    {station.nivel_m}m
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>Calado Mín.</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>
                    {station.calado_min}m
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>Tendência</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: station.tendencia === 'descendo' ? '#f59e0b' : station.tendencia === 'subindo' ? '#22c55e' : '#94a3b8' }}>
                    {getTendenciaIcon(station.tendencia)} {station.tendencia}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>Atualização</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>
                    {formatDate(station.ultima_atualizacao)}
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
