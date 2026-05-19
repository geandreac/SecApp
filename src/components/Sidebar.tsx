'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/mapa', label: 'Mapa Fluvial', icon: '🗺️' },
  { href: '/alertas', label: 'Alertas', icon: '🔔' },
  { href: '/historico', label: 'Histórico', icon: '📈' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Header Mobile */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 999,
        }}
        className="mobile-header"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24 }}>🌊</span>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }} className="gradient-text">
            SecApp
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-default)',
            borderRadius: 10,
            color: 'var(--text-primary)',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 20,
            transition: 'background 0.2s',
          }}
          aria-label="Abrir menu de navegação"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Drawer Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1000,
          }}
        />
      )}

      {/* Navigation Aside (Desktop & Drawer Mobile) */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 260,
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
          zIndex: 1001,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`sidebar-nav ${mobileOpen ? 'open' : ''}`}
      >
        {/* Logo (Desktop only) */}
        <div className="logo-container" style={{ marginBottom: 40, padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
            }}>
              🌊
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }} className="gradient-text">
                SecApp
              </h1>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                Monitoramento Amazônia
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items with Large touch-targets in mobile */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 18px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(14, 165, 233, 0.15)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  minHeight: 48, /* Touch target standards */
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Status footer */}
        <div style={{
          padding: '16px',
          borderRadius: 14,
          background: 'rgba(14, 165, 233, 0.03)',
          border: '1px solid var(--border-subtle)',
          marginTop: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-normal)',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
            }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>
              Sistema Online
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Atualizado: há 2 horas
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Fonte: ANA / INMET
          </p>
        </div>
      </aside>

      <style>{`
        /* Desktop styles in aside by default */
        @media (max-width: 1024px) {
          .mobile-header {
            display: flex !important;
          }
          .sidebar-nav {
            transform: translateX(-100%);
            box-shadow: 20px 0 40px rgba(0, 0, 0, 0.8);
            border-right: 1px solid var(--border-default);
            background: var(--bg-glass) !important;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding-top: 80px !important;
          }
          .sidebar-nav.open {
            transform: translateX(0);
          }
          .logo-container {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
