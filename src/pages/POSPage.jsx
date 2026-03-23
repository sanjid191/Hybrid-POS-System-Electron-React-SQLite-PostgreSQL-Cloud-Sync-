import { ShoppingCart } from 'lucide-react';

function POSPage() {
  return (
    <div className="page animate-fadeIn">
      <div className="page-header">
        <div>
          <h2 className="page-title">Point of Sale</h2>
          <p className="page-subtitle">Select products and complete sales quickly.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
        <ShoppingCart size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-muted)' }}>
          POS interface will be built in Phase 3. Add products first.
        </p>
      </div>
    </div>
  );
}

export default POSPage;
