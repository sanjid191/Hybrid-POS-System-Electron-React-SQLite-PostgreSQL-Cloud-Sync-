import { useLocation } from 'react-router-dom';
import { Bell, Search, Wifi, WifiOff } from 'lucide-react';
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
