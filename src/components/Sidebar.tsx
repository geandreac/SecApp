'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Map, Bell, BarChart2, X, Menu, Wifi } from 'lucide-react';
import { RIOS_AMAZONAS } from '@/data/mock-data';

const NAV_ITEMS = [
  { href: '/',         label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/mapa',     label: 'Mapa Fluvial', icon: Map },
  { href: '/alertas',  label: 'Alertas',      icon: Bell },
  { href: '/historico',label: 'Histórico',    icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [updateText, setUpdateText] = useState('Atualizado: há 2 horas');

  useEffect(() => {
    const renderStatus = () => {
      const datas = RIOS_AMAZONAS.map(rio => new Date(rio.ultima_atualizacao).getTime());
      const maisRecenteTime = Math.max(...datas);
      const dataMock = new Date(maisRecenteTime);
      const agora = new Date();
      const diffMs = agora.getTime() - maisRecenteTime;

      if (diffMs > 0) {
        const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHoras < 24) {
          if (diffHoras === 0) {
            const diffMinutos = Math.floor(diffMs / (1000 * 60));
            setUpdateText(`Atualizado: há ${diffMinutos} min`);
            return;
          }
          setUpdateText(`Atualizado: há ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`);
          return;
        }
      }

      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      setUpdateText(`Atualizado: ${dataMock.toLocaleString('pt-BR', options)}`);
    };

    renderStatus();
    const interval = setInterval(renderStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Mobile Top Header ─────────────────────────────────── */}
      <header className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/SecApp.svg"
            alt="SecApp Logo"
            style={{ height: 32, width: 32, borderRadius: 8, objectFit: 'contain' }}
          />
          <span
            style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}
            className="gradient-text"
          >
            SecApp
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="hamburger-btn"
          aria-label="Abrir menu de navegação"
        >
          {mobileOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
        </button>
      </header>

      {/* ── Overlay ───────────────────────────────────────────── */}
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

      {/* ── Sidebar ───────────────────────────────────────────── */}
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
        {/* Logo */}
        <div className="logo-container" style={{ marginBottom: 40, padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <img
              src="/SecApp.svg"
              alt="SecApp Logo"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                objectFit: 'contain',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
              }}
            />
            <div>
              <h1
                style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}
                className="gradient-text"
              >
                SecApp
              </h1>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                Monitoramento Amazônia
              </p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(139,92,246,0.08))'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(14, 165, 233, 0.2)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  minHeight: 48,
                  position: 'relative',
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 3,
                      height: '60%',
                      background: 'var(--gradient-primary)',
                      borderRadius: '0 3px 3px 0',
                    }}
                  />
                )}
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
                    flexShrink: 0,
                    transition: 'color 0.2s',
                  }}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Status Footer */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: 14,
            background: 'rgba(14, 165, 233, 0.03)',
            border: '1px solid var(--border-subtle)',
            marginTop: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Wifi
              size={12}
              style={{ color: 'var(--color-normal)', flexShrink: 0 }}
            />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>
              Sistema Online
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {updateText}
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Fonte: ANA / INMET
          </p>
        </div>
      </aside>

      <style>{`
        /* Mobile Header */
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          z-index: 999;
        }

        /* Hamburger Button */
        .hamburger-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-default);
          border-radius: 10px;
          color: var(--text-primary);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .hamburger-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-primary);
        }

        /* Nav link hover (non-touch devices) */
        @media (hover: hover) {
          .nav-link:not(.nav-link-active):hover {
            background: rgba(255, 255, 255, 0.04) !important;
            border-color: var(--border-default) !important;
            color: var(--text-primary) !important;
          }
        }

        /* Responsive breakpoints */
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
