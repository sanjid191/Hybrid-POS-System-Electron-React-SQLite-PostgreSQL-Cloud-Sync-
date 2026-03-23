import { Users } from 'lucide-react';

function CustomersPage() {
  return (
    <div className="page animate-fadeIn">
      <div className="page-header">
        <div>
          <h2 className="page-title">Customers</h2>
          <p className="page-subtitle">Manage customers and track due balances.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
        <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-muted)' }}>
          Customer management will be built in Phase 7.
        </p>
      </div>
    </div>
  );
}

export default CustomersPage;
