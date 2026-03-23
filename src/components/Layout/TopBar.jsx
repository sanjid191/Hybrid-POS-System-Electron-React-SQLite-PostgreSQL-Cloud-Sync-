import { useLocation } from 'react-router-dom';
import { Bell, Search, Wifi, WifiOff, CloudUpload, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import './TopBar.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/pos': 'Point of Sale',
  '/products': 'Products',
  '/sales': 'Sales History',
  '/customers': 'Customers',
  '/settings': 'Settings',
};

function TopBar() {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Sync State
  const [syncStatus, setSyncStatus] = useState({ pending: 0, isSyncing: false });

  const fetchSyncStatus = async () => {
    const res = await window.electronAPI.getSyncStatus();
    if (res.success) setSyncStatus(res.data);
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Poll sync status occasionally
  useEffect(() => {
    fetchSyncStatus();
    const syncTimer = setInterval(fetchSyncStatus, 15000);
    return () => clearInterval(syncTimer);
  }, []);

  const handleManualSync = async () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));
    const res = await window.electronAPI.triggerSync();
    if (res.success) {
      if (res.pushed > 0) alert(`Synced ${res.pushed} records to cloud successfully!`);
    } else {
      alert(`Sync Error: ${res.error}`);
    }
    fetchSyncStatus();
  };

  const title = pageTitles[location.pathname] || 'Hybrid POS';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right">
        {/* Search */}
        <div className="topbar-search">
          <Search size={16} className="topbar-search-icon" />
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Search anything…"
          />
        </div>

        {/* Sync Status Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: isOnline ? 1 : 0.5 }} onClick={isOnline && !syncStatus.isSyncing ? handleManualSync : undefined}>
           {syncStatus.isSyncing ? <RefreshCw size={16} className="spin text-primary" /> : <CloudUpload size={16} className={syncStatus.pending > 0 ? 'text-warning' : 'text-success'} />}
           <span style={{ fontSize: '13px', fontWeight: 500, color: syncStatus.pending > 0 ? 'var(--color-warning)' : 'var(--text-secondary)' }}>
              {syncStatus.isSyncing ? 'Syncing...' : syncStatus.pending > 0 ? `${syncStatus.pending} Pending` : 'Up to date'}
           </span>
        </div>

        {/* Online status */}
        <div className={`topbar-status ${isOnline ? 'topbar-status--online' : 'topbar-status--offline'}`}>
          {isOnline ? <Wifi size={15} /> : <WifiOff size={15} />}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>

        {/* Notification */}
        <button className="topbar-icon-btn" title="Notifications">
          <Bell size={18} />
        </button>

        {/* Time */}
        <div className="topbar-time">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
