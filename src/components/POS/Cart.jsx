import { Trash2, Plus, Minus, ShoppingCart, User } from 'lucide-react';
import './Cart.css';

function Cart({ items, onUpdateQty, onClear, onCheckout, customers, selectedCustomer, onSelectCustomer }) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="pos-cart">
      <div className="cart-header">
        <h3 className="cart-title">
          <ShoppingCart size={20} className="text-primary"/> Current Order
        </h3>
        <button className="btn-icon text-muted" onClick={onClear} title="Clear Cart">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="cart-customer-selector">
        <User size={16} className="text-secondary" />
        <select 
          className="input" 
          style={{ border: 'none', background: 'transparent', padding: '0 8px', flex: 1, fontSize: 'var(--font-size-sm)', color: selectedCustomer ? 'var(--text-primary)' : 'var(--text-secondary)' }}
          value={selectedCustomer?.id || ''}
          onChange={(e) => onSelectCustomer(e.target.value)}
        >
          <option value="">Walk-in Customer</option>
          {customers?.map(c => (
            <option key={c.id} value={c.id}>{c.name} {c.phone ? `(${c.phone})` : ''}</option>
          ))}
        </select>
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <div className="cart-empty text-muted">
            Cart is empty. Select products from the grid to add them.
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-name">{item.product_name}</span>
                <span className="cart-item-price">৳{item.unit_price.toFixed(2)}</span>
              </div>
              <div className="cart-item-actions">
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => onUpdateQty(item.product_id, item.quantity - 1)}><Minus size={14}/></button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.product_id, item.quantity + 1)}><Plus size={14}/></button>
                </div>
                <span className="cart-item-total text-primary font-bold">
                  ৳{item.total.toFixed(2)}
                </span>
                <button className="btn-icon text-danger" onClick={() => onUpdateQty(item.product_id, 0)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="cart-summary-row">
          <span className="text-secondary">Subtotal</span>
          <span className="font-medium text-primary">৳{subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row mt-sm">
           <span className="text-secondary">Tax/Discount</span>
           <span className="text-muted text-sm">(Calculated at checkout)</span>
        </div>
        
        <div className="cart-total-banner">
          <span>Total</span>
          <span>৳{subtotal.toFixed(2)}</span>
        </div>

        <button 
          className="btn btn-primary checkout-btn" 
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
