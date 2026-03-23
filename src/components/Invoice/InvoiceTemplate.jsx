import React from 'react';
import './InvoiceTemplate.css';

// Using forwardRef so it can be passed to react-to-print or similar library if needed later,
// or just rendered in a hidden div to print via window.print()
const InvoiceTemplate = React.forwardRef(({ sale, shopSettings }, ref) => {
  if (!sale) return null;

  const {
    id,
    created_at,
    customer_name,
    customer_address,
    customer_phone,
    subtotal,
    discount,
    tax,
    total,
    paid,
    due,
    payment_method,
    items
  } = sale;

  // Format date nicely
  const printDate = new Date(created_at).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="invoice-print-container" ref={ref}>
      <div className="invoice-header">
        <h1 className="invoice-shop-name">{shopSettings?.name || 'Hybrid POS Shop'}</h1>
        <p className="invoice-shop-address">{shopSettings?.address || '123 Main Street, City'}</p>
        <p className="invoice-shop-phone">Phone: {shopSettings?.phone || '+880 1XXX-XXXXXX'}</p>
      </div>

      <div className="invoice-divider" />

      <div className="invoice-meta-row">
        <div className="invoice-meta-col">
          <strong>Invoice No:</strong> <span className="invoice-id-small">{id.split('-').pop().toUpperCase()}</span><br />
          <strong>Date:</strong> {printDate}
        </div>
        <div className="invoice-meta-col text-right">
          <strong>Customer:</strong> {customer_name || 'Walk-in Customer'}<br />
          {customer_phone && <span><strong>Phone:</strong> {customer_phone}</span>}
        </div>
      </div>

      <table className="invoice-items-table">
        <thead>
          <tr>
            <th className="text-left">Item Description</th>
            <th className="text-center">Qty</th>
            <th className="text-right">Price</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, idx) => (
            <tr key={idx}>
              <td className="text-left">{item.product_name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-right">{item.unit_price.toFixed(2)}</td>
              <td className="text-right">{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-summary">
        <div className="invoice-summary-row">
          <span>Subtotal:</span>
          <span>{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="invoice-summary-row">
            <span>Discount:</span>
            <span>-{discount.toFixed(2)}</span>
          </div>
        )}
        {tax > 0 && (
           <div className="invoice-summary-row">
            <span>Tax:</span>
            <span>+{tax.toFixed(2)}</span>
          </div>
        )}
        <div className="invoice-summary-row invoice-grand-total">
          <span>Grand Total:</span>
          <span>৳{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="invoice-payment-details">
        <div className="invoice-summary-row">
          <span>Amount Paid ({payment_method}):</span>
          <span>৳{paid.toFixed(2)}</span>
        </div>
        <div className="invoice-summary-row text-danger-print">
          <span>Due Balance:</span>
          <span>৳{due.toFixed(2)}</span>
        </div>
      </div>

      <div className="invoice-divider" />
      
      <div className="invoice-footer">
        <p>Thank you for your business!</p>
        <p className="invoice-footer-small">Goods sold are not returnable without original receipt.</p>
        <p className="invoice-footer-small">Powered by HybridPOS</p>
      </div>
    </div>
  );
});

export default InvoiceTemplate;
