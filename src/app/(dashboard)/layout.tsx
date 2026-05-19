import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'row',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Sidebar />
      <main className="main-content" style={{ minWidth: 0 }}>
        {children}
      </main>
      <style>{`
        .main-content {
          flex: 1;
          background: var(--bg-base);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          margin-left: 260px;
          width: calc(100% - 260px);
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) {
          .main-content {
            margin-left: 0 !important;
            width: 100% !important;
            padding-top: 64px;
          }
        }
      `}</style>
    </div>
  );
}
