import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'row' }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          background: 'var(--bg-base)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'padding 0.2s, margin-left 0.2s',
        }}
        className="main-content"
      >
        {children}
      </main>
      <style>{`
        .main-content {
          margin-left: 260px;
          padding: 24px 32px;
        }
        @media (max-width: 1024px) {
          .main-content {
            margin-left: 0 !important;
            padding: 16px !important;
            padding-top: 80px !important; /* Elegant spacing under mobile header */
          }
        }
      `}</style>
    </div>
  );
}
