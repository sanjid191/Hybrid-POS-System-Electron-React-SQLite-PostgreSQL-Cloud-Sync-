import { useState } from 'react';
import { X } from 'lucide-react';
import './ProductForm.css';

function ProductForm({ initialData, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    price: initialData?.price || '',
    cost_price: initialData?.cost_price || '',
    stock: initialData?.stock || '',
    low_stock_threshold: initialData?.low_stock_threshold || '5',
    unit: initialData?.unit || 'pcs',
    barcode: initialData?.barcode || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      cost_price: parseFloat(formData.cost_price || 0),
      stock: parseFloat(formData.stock || 0),
      low_stock_threshold: parseFloat(formData.low_stock_threshold || 5)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-scaleIn">
        <div className="modal-header">
          <h3>{initialData ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Product Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="input" 
              required 
              autoFocus 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="input" placeholder="e.g. Cement, Rod" />
            </div>
            <div className="form-group">
              <label>Barcode</label>
              <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} className="input" placeholder="Scan or type" />
            </div>
          </div>

          <div className="form-row form-row-3">
            <div className="form-group">
              <label>Selling Price (৳) <span className="text-danger">*</span></label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="input" min="0" step="0.01" required />
            </div>
            <div className="form-group">
              <label>Cost Price (৳)</label>
              <input type="number" name="cost_price" value={formData.cost_price} onChange={handleChange} className="input" min="0" step="0.01" />
            </div>
            <div className="form-group">
              <label>Unit</label>
              <select name="unit" value={formData.unit} onChange={handleChange} className="input">
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="bag">bag</option>
                <option value="ton">ton</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Current Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="input" step="0.01" />
            </div>
            <div className="form-group">
              <label>Low Stock Alert</label>
              <input type="number" name="low_stock_threshold" value={formData.low_stock_threshold} onChange={handleChange} className="input" min="0" step="0.01" />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
