import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, DollarSign, Users } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import CustomerForm from '../components/Customers/CustomerForm';
import PaymentForm from '../components/Customers/PaymentForm';
import '../pages/ProductsPage.css'; // Reusing generic table styles

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  
  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentCustomer, setPaymentCustomer] = useState(null);

  const fetchCustomers = async (searchQuery = '') => {
    const res = await window.electronAPI.getCustomers({ search: searchQuery });
    if (res.success) {
      setCustomers(res.data);
    } else {
      console.error('Failed to fetch customers:', res.error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCustomers(search);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Customer Actions
  const handleSaveCustomer = async (data) => {
    if (editingCustomer) {
      const res = await window.electronAPI.updateCustomer(editingCustomer.id, data);
      if (res.success) {
        setCustomers(customers.map(c => c.id === editingCustomer.id ? res.data : c));
      }
    } else {
      data.id = uuidv4();
      const res = await window.electronAPI.createCustomer(data);
      if (res.success) {
        setCustomers([res.data, ...customers]);
      }
    }
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer? This may affect their sales history links!')) {
      const res = await window.electronAPI.deleteCustomer(id);
      if (res.success) {
        setCustomers(customers.filter(c => c.id !== id));
      }
    }
  };

  const openEdit = (customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  // Payment Actions
  const openPayment = (customer) => {
    setPaymentCustomer(customer);
    setIsPaymentOpen(true);
  };

  const handleSavePayment = async (data) => {
    const paymentData = {
      id: uuidv4(),
      customer_id: paymentCustomer.id,
      amount: data.amount,
      method: data.method,
      note: data.note || 'Direct Due Clearance'
    };

    const res = await window.electronAPI.createPayment(paymentData);
    if (res.success) {
      // Re-fetch custom data to accurately pull new total_due natively computed via db.transaction
      fetchCustomers(search);
      setIsPaymentOpen(false);
      setPaymentCustomer(null);
      alert('Payment recorded successfully!');
    } else {
      alert(`Payment failed: ${res.error}`);
    }
  };

  return (
    <div className="page animate-fadeIn">
      <div className="page-header">
        <div>
          <h2 className="page-title">Customers</h2>
          <p className="page-subtitle">Track customer balances and history across Walk-ins or Members.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { setEditingCustomer(null); setIsFormOpen(true); }}
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="card products-container">
        <div className="products-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              className="input search-input" 
              placeholder="Search by name, phone or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer Details</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Outstanding Due (৳)</th>
                <th className="text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <span className="font-medium text-white" style={{ display: 'block' }}>{customer.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{customer.address || ''}</span>
                    </td>
                    <td>{customer.phone || '—'}</td>
                    <td>{customer.email || '—'}</td>
                    <td>
                       <span className={`stock-badge ${customer.total_due > 0 ? 'stock-low' : 'stock-good'}`}>
                        ৳{customer.total_due.toFixed(2)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      {customer.total_due > 0 && (
                        <button 
                           className="btn-icon" 
                           style={{ color: 'var(--color-success)', background: 'var(--color-success-bg)' }}
                           onClick={() => openPayment(customer)} 
                           title="Record Payment"
                        >
                          <DollarSign size={16} />
                        </button>
                      )}
                      <button className="btn-icon text-primary" onClick={() => openEdit(customer)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon text-danger" onClick={() => handleDelete(customer.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <Users size={48} className="empty-icon" />
                    <p>No customers found here.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <CustomerForm 
          initialData={editingCustomer} 
          onSave={handleSaveCustomer} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}

      {isPaymentOpen && (
        <PaymentForm 
          customer={paymentCustomer} 
          onSave={handleSavePayment} 
          onClose={() => setIsPaymentOpen(false)} 
        />
      )}
    </div>
  );
}

export default CustomersPage;
