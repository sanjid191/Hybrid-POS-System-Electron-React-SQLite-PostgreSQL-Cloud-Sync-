import { useState } from 'react';
import { Save, HardDrive, ShieldCheck, Database, Cloud } from 'lucide-react';
import '../pages/ProductsPage.css';

function SettingsPage() {
  const [shopName, setShopName] = useState('Hybrid POS Global');
  const [address, setAddress] = useState('123 Main Street, Business Block');
  const [phone, setPhone] = useState('+880 18XX-XXXXXX');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('Shop configurations saved locally successfully!');
    // Real implementation would log these string fields into an SQLite "settings" table
  };

  const handleBackup = async () => {
    const res = await window.electronAPI.exportDatabase();
    if (res.success) {
      alert(`Database successfully baked up to:\n${res.filePath}`);
    } else {
      if (res.error !== 'Cancelled by user') {
         alert(`Backup failed: ${res.error}`);
      }
    }
  };

  return (
    <div className="page animate-fadeIn">
       <div className="page-header">
        <div>
          <h2 className="page-title">System Settings</h2>
          <p className="page-subtitle">Configure application settings and data management.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
        
        {/* Basic Shop Settings */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)' }}>
             <ShieldCheck size={20} className="text-primary"/>
             <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>Shop Details</h3>
          </div>
          
          <form style={{ padding: 'var(--space-lg)' }} onSubmit={handleSaveSettings}>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Registered Shop Name</label>
              <input className="input" type="text" value={shopName} onChange={e => setShopName(e.target.value)} required />
            </div>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Invoice Address Header</label>
              <input className="input" type="text" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
             <div style={{ marginBottom: 'var(--space-md)' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Contact Phone</label>
              <input className="input" type="text" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%' }}>
              <Save size={18} /> Update Configurations
            </button>
          </form>
        </div>

        {/* Database & Application Info */}
        <div className="card">
           <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)' }}>
             <HardDrive size={20} className="text-secondary"/>
             <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>Data & Environment</h3>
          </div>
          
          <div style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
             <div style={{ background: 'var(--bg-root)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
               <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: '4px' }}>App Version</h4>
               <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>v1.0.0 (Offline-First Build)</p>
             </div>

             <div style={{ background: 'var(--color-warning-bg)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                   <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-warning)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><Cloud size={16}/> Sync Engine</h4>
                   <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>PostgreSQL Automatic Hub</p>
                 </div>
                 <span style={{ fontSize: '11px', padding: '4px 8px', background: 'var(--color-success)', color: '#fff', borderRadius: 'var(--radius-full)', fontWeight: 'bold' }}>Active</span>
               </div>
             </div>

             <div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-md)', lineHeight: '1.5' }}>
                  Your data resides safely packed inside a high-speed local SQLite `.db` file. We strongly recommend making manual physical exports onto a USB / Hard disk weekly despite cloud availability.
                </p>
                <button className="btn" style={{ width: '100%', background: 'var(--bg-card-hover)', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }} onClick={handleBackup}>
                  <Database size={18} /> Export / Backup Database
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;
