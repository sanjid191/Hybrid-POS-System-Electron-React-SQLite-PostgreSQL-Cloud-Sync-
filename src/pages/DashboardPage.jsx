import { BarChart3, DollarSign, ShoppingBag, AlertTriangle } from 'lucide-react';
import './DashboardPage.css';

function DashboardPage() {
  const stats = [
    {
      label: "Today's Sales",
      value: '৳0',
      icon: DollarSign,
      color: 'primary',
      change: '+0%',
    },
    {
      label: 'Total Products',
      value: '0',
      icon: ShoppingBag,
      color: 'accent',
      change: null,
    },
    {
      label: 'Weekly Revenue',
      value: '৳0',
      icon: BarChart3,
      color: 'success',
      change: '+0%',
    },
    {
      label: 'Low Stock Items',
      value: '0',
      icon: AlertTriangle,
      color: 'warning',
      change: null,
    },
  ];

  return (
    <div className="page animate-fadeIn">
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Welcome back! Here's your business overview.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="dashboard-stats">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="stat-card card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`stat-icon stat-icon--${stat.color}`}>
                <Icon size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
              {stat.change && (
                <span className="stat-change">{stat.change}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Placeholder chart areas */}
      <div className="dashboard-charts">
        <div className="card dashboard-chart-card">
          <h3 className="chart-title">Sales Trend</h3>
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>Chart will appear after sales data is recorded</p>
          </div>
        </div>
        <div className="card dashboard-chart-card">
          <h3 className="chart-title">Top Products</h3>
          <div className="chart-placeholder">
            <ShoppingBag size={48} />
            <p>Product data will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
