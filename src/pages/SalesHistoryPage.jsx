import { History } from 'lucide-react';

function SalesHistoryPage() {
  return (
    <div className="page animate-fadeIn">
      <div className="page-header">
        <div>
          <h2 className="page-title">Sales History</h2>
          <p className="page-subtitle">View and filter your past transactions.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
        <History size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-muted)' }}>
          Sales history will be built in Phase 6.
        </p>
      </div>
    </div>
  );
}

export default SalesHistoryPage;
