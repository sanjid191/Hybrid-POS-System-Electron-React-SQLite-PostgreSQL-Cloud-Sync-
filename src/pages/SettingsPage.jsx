import { Settings } from 'lucide-react';

function SettingsPage() {
  return (
    <div className="page animate-fadeIn">
      <div className="page-header">
        <div>
          <h2 className="page-title">Settings</h2>
          <p className="page-subtitle">Configure your POS system preferences.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--space-xl)' }}>
        <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
          General
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div>
            <label
              style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}
            >
              Shop Name
            </label>
            <input
              className="input"
              defaultValue="My Construction Materials Shop"
              style={{ maxWidth: 400 }}
            />
          </div>

          <div>
            <label
              style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}
            >
              Shop Address
            </label>
            <input
              className="input"
              placeholder="Enter your shop address"
              style={{ maxWidth: 400 }}
            />
          </div>

          <div>
            <label
              style={{ display: 'block', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}
            >
              Phone Number
            </label>
            <input
              className="input"
              placeholder="+880 1XXX-XXXXXX"
              style={{ maxWidth: 400 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
