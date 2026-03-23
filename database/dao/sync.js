const { getDbConnection } = require('../connection');

function getUnsyncedData() {
  const db = getDbConnection();
  
  const payload = {
    products: db.prepare("SELECT * FROM products WHERE synced = 0").all(),
    customers: db.prepare("SELECT * FROM customers WHERE synced = 0").all(),
    sales: db.prepare("SELECT * FROM sales WHERE synced = 0").all(),
    sale_items: db.prepare("SELECT * FROM sale_items WHERE synced = 0").all(),
    payments: db.prepare("SELECT * FROM payments WHERE synced = 0").all(),
  };

  const totalUnsynced = 
    payload.products.length + 
    payload.customers.length + 
    payload.sales.length + 
    payload.sale_items.length + 
    payload.payments.length;

  return { payload, totalUnsynced };
}

function markAsSynced(payload) {
  const db = getDbConnection();
  
  const updateProducts = db.prepare("UPDATE products SET synced = 1 WHERE id = ?");
  const updateCustomers = db.prepare("UPDATE customers SET synced = 1 WHERE id = ?");
  const updateSales = db.prepare("UPDATE sales SET synced = 1 WHERE id = ?");
  const updateSaleItems = db.prepare("UPDATE sale_items SET synced = 1 WHERE id = ?");
  const updatePayments = db.prepare("UPDATE payments SET synced = 1 WHERE id = ?");

  const markTransaction = db.transaction(() => {
    payload.products.forEach(p => updateProducts.run(p.id));
    payload.customers.forEach(c => updateCustomers.run(c.id));
    payload.sales.forEach(s => updateSales.run(s.id));
    payload.sale_items.forEach(si => updateSaleItems.run(si.id));
    payload.payments.forEach(p => updatePayments.run(p.id));
  });

  markTransaction();
}

function getSyncStatus() {
  const db = getDbConnection();
  
  const counts = {
    products: db.prepare("SELECT COUNT(*) as count FROM products WHERE synced = 0").get().count,
    customers: db.prepare("SELECT COUNT(*) as count FROM customers WHERE synced = 0").get().count,
    sales: db.prepare("SELECT COUNT(*) as count FROM sales WHERE synced = 0").get().count,
    sale_items: db.prepare("SELECT COUNT(*) as count FROM sale_items WHERE synced = 0").get().count,
    payments: db.prepare("SELECT COUNT(*) as count FROM payments WHERE synced = 0").get().count,
  };
  
  const pending = Object.values(counts).reduce((a, b) => a + b, 0);
  
  return { pending, details: counts };
}

module.exports = {
  getUnsyncedData,
  markAsSynced,
  getSyncStatus
};
