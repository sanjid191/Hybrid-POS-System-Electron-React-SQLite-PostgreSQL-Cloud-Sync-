import { Package } from 'lucide-react';

function ProductsPage() {
  return (
    <div className="page animate-fadeIn">
      <div className="page-header">
        <div>
          <h2 className="page-title">Products</h2>
          <p className="page-subtitle">Manage your product catalog and inventory.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
        <Package size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-muted)' }}>
          Product management will be built in Phase 3.
        </p>
      </div>
    </div>
  );
}

export default ProductsPage;
