import React, { useState, useEffect } from 'react';

const API_BASE = "http://localhost/assinment/php-backend/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("authUser") || "{}");

  const handleDownloadInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to download invoices.");
      return;
    }
    
    let itemsHtml = '';
    if (order.items) {
      order.items.forEach((item, idx) => {
        const qty = parseInt(item.quantity) || 1;
        itemsHtml += `
          <tr>
            <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e0e0e0;">${idx + 1}</td>
            <td style="padding: 12px; font-weight: bold; color: #104c82; border-bottom: 1px solid #e0e0e0;">${item.name}</td>
            <td style="padding: 12px; color: #555; border-bottom: 1px solid #e0e0e0;">Electric Vehicle Product</td>
            <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e0e0e0;">${qty}</td>
            <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e0e0e0;">-</td>
            <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e0e0e0;">-</td>
          </tr>
        `;
      });
    }

    const orderDate = new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const dueDate = new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTotal = parseFloat(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 });
    const taxAmount = (parseFloat(order.total_amount) * 0.18).toLocaleString('en-IN', {minimumFractionDigits: 2});

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 0; margin: 0; color: #333; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .invoice-container { max-width: 900px; margin: 0 auto; padding: 25px 35px; position: relative; overflow: hidden; }
            
            /* Top right corner accent */
            .corner-tr { position: absolute; top: 0; right: 0; width: 0; height: 0; border-top: 130px solid #104c82; border-left: 130px solid transparent; z-index: -1; }
            .corner-tr::after { content: ''; position: absolute; top: -130px; left: -70px; width: 0; height: 0; border-top: 90px solid #4a90e2; border-left: 90px solid transparent; }
            
            /* Bottom left corner accent */
            .corner-bl { position: absolute; bottom: 0; left: 0; width: 0; height: 0; border-bottom: 130px solid #104c82; border-right: 130px solid transparent; z-index: -1; }
            .corner-bl::after { content: ''; position: absolute; bottom: -130px; right: -70px; width: 0; height: 0; border-bottom: 90px solid #4a90e2; border-right: 90px solid transparent; }

            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; }
            .logo-section h1 { color: #104c82; margin: 0; font-size: 32px; font-weight: 800; display: flex; align-items: center; gap: 8px; }
            .logo-section p { margin: 5px 0 0 42px; color: #666; font-size: 12px; }
            
            .company-info { text-align: right; font-size: 11px; color: #444; line-height: 1.5; padding-right: 50px; }
            .company-info p { margin: 2px 0; }
            
            .invoice-title { font-size: 36px; font-weight: 800; color: #104c82; margin: 10px 0 20px; letter-spacing: 1px; }
            
            .top-info { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
            .invoice-details table { width: auto; font-size: 13px; }
            .invoice-details td { padding: 3px 15px 3px 0; }
            .invoice-details td:first-child { font-weight: 600; color: #104c82; }
            
            .total-due-box { background: #e8f0fe; padding: 15px 25px; border-radius: 8px; text-align: center; }
            .total-due-box p { margin: 0 0 8px; color: #555; font-size: 13px; font-weight: 600; }
            .total-due-box h2 { margin: 0; color: #104c82; font-size: 24px; font-weight: 800; }
            
            .addresses { display: flex; gap: 30px; margin-bottom: 25px; }
            .address-col { flex: 1; }
            .address-title { background: #e8f0fe; color: #104c82; font-weight: 700; padding: 6px 12px; border-radius: 4px; margin-bottom: 12px; font-size: 13px; }
            .address-content { padding: 0 12px; font-size: 12px; line-height: 1.5; color: #333; }
            .address-content strong { font-size: 14px; color: #104c82; display: block; margin-bottom: 4px; }
            
            .table-container { margin-bottom: 20px; }
            table.items-table { width: 100%; border-collapse: collapse; font-size: 12px; }
            table.items-table th { background: #104c82; color: #fff; padding: 10px; font-weight: 600; text-align: left; }
            table.items-table th.center { text-align: center; }
            table.items-table th.right { text-align: right; }
            table.items-table td { padding: 10px; }
            
            .totals-table-container { display: flex; justify-content: flex-end; margin-bottom: 25px; }
            table.totals-table { width: 300px; font-size: 13px; border-collapse: collapse; }
            table.totals-table td { padding: 10px 12px; border-bottom: 1px solid #e0e0e0; }
            table.totals-table td.label { font-weight: 600; color: #555; }
            table.totals-table td.amount { text-align: right; font-weight: 600; }
            table.totals-table tr.final-total { background: #e8f0fe; }
            table.totals-table tr.final-total td { color: #104c82; font-weight: 800; border: none; font-size: 15px; }
            
            .footer-section { display: flex; justify-content: space-between; margin-top: 30px; font-size: 11px; page-break-inside: avoid; }
            .payment-details h4, .notes h4 { color: #104c82; margin: 0 0 8px; font-size: 13px; display: flex; align-items: center; gap: 6px; }
            .payment-details table td { padding: 2px 10px 2px 0; }
            .payment-details table td:first-child { color: #666; }
            .payment-details table td:last-child { font-weight: 600; }
            
            .notes ul { padding-left: 15px; color: #555; line-height: 1.5; margin: 0; }
            
            .signature { text-align: center; align-self: flex-end; }
            .signature h3 { color: #4a90e2; font-size: 20px; font-style: italic; margin: 0 0 5px; font-family: cursive; }
            .signature p { margin: 0; color: #666; }
            
            @media print {
              @page { margin: 0.5cm; size: A4; }
              body { margin: 0; transform: scale(0.95); transform-origin: top center; }
              .invoice-container { margin-top: 1cm; padding-bottom: 10px; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="corner-tr"></div>
            <div class="corner-bl"></div>
            
            <div class="header">
              <div class="logo-section">
                <h1>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#104c82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  MotoMax
                </h1>
                <p>Better Electric Vehicles. Happier You.</p>
              </div>
              <div class="company-info">
                <p>📍 A-53, Naraina Industrial Area Phase-1, Delhi - 110028</p>
                <p>📞 +91-11-48224444</p>
                <p>✉️ info@motomaxev.com</p>
                <p>🌐 www.motomaxev.com</p>
              </div>
            </div>
            
            <div class="top-info">
              <div>
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-details">
                  <table cellspacing="0">
                    <tr><td>Invoice No</td><td>: #INV-${new Date().getFullYear()}-${String(order.id).padStart(3, '0')}</td></tr>
                    <tr><td>Invoice Date</td><td>: ${orderDate}</td></tr>
                    <tr><td>Due Date</td><td>: ${dueDate}</td></tr>
                  </table>
                </div>
              </div>
              
              <div class="total-due-box">
                <p>Total Amount Due</p>
                <h2>₹ ${formattedTotal}</h2>
              </div>
            </div>
            
            <div class="addresses">
              <div class="address-col">
                <div class="address-title">Bill To</div>
                <div class="address-content">
                  <strong>${user.name || 'Customer'}</strong>
                  <p style="margin: 0;">Email: ${user.email}</p>
                  <p style="margin: 0;">Payment Method: ${order.payment_method}</p>
                  <p style="margin: 0;">Order Status: ${order.order_status}</p>
                </div>
              </div>
              <div class="address-col">
                <div class="address-title">Ship To</div>
                <div class="address-content">
                  <strong>${user.name || 'Customer'}</strong>
                  <p style="margin: 0;">(Shipping address is same as billing address)</p>
                </div>
              </div>
            </div>
            
            <div class="table-container">
              <table class="items-table">
                <thead>
                  <tr>
                    <th class="center" style="width: 50px;">#</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th class="center">Qty</th>
                    <th class="right">Unit Price (₹)</th>
                    <th class="right">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>
            
            <div class="totals-table-container">
              <table class="totals-table">
                <tr>
                  <td class="label">Subtotal</td>
                  <td class="amount">₹ ${formattedTotal}</td>
                </tr>
                <tr>
                  <td class="label">Tax (18% included)</td>
                  <td class="amount">₹ ${taxAmount}</td>
                </tr>
                <tr class="final-total">
                  <td class="label">Total Amount</td>
                  <td class="amount">₹ ${formattedTotal}</td>
                </tr>
              </table>
            </div>
            
            <div class="footer-section">
              <div class="payment-details">
                <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> Payment Details</h4>
                <table cellspacing="0">
                  <tr><td>Bank Name</td><td>: HDFC Bank</td></tr>
                  <tr><td>Account No</td><td>: 123456789012</td></tr>
                  <tr><td>IFSC Code</td><td>: HDFC0001234</td></tr>
                  <tr><td>UPI ID</td><td>: motomax@okhdfc</td></tr>
                </table>
              </div>
              
              <div class="notes">
                <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Notes</h4>
                <ul>
                  <li>Goods once sold will not be returned or exchanged.</li>
                  <li>Please make the payment by the due date.</li>
                  <li>For any queries, contact us at +91 48224444.</li>
                </ul>
              </div>
              
              <div class="signature">
                <h3>Thank You!</h3>
                <p>For shopping with us.</p>
              </div>
            </div>
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 500);
            }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  useEffect(() => {
    if (!user.id) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE}/orders.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, [user.id]);

  if (loading) return <div style={{padding: '40px', textAlign: 'center', fontSize: '1.2rem', color: '#104c82'}}>Loading your orders... Please wait.</div>;

  return (
    <div className="dash-card">
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px"}}>
        <h3 style={{fontSize: "1.4rem", fontWeight: 800, color: "#1e293b", margin: 0}}>Order History</h3>
      </div>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders. Start exploring our EV products!</p>
        </div>
      ) : (
        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
          {orders.map((order) => (
            <div key={order.id} style={{border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "15px", background: "#f8fafc"}}>
              <div style={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px"}}>
                <div style={{color: "#888", fontSize: "0.85rem"}}>Order #${order.id} • {new Date(order.created_at).toLocaleDateString()}</div>
                <div>
                  <span style={{display: "inline-block", padding: "4px 10px", borderRadius: "20px", background: order.order_status === 'Delivered' ? "#dcfce7" : "#fef9c3", color: order.order_status === 'Delivered' ? "#166534" : "#854d0e", fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase"}}>{order.order_status}</span>
                </div>
              </div>
              
              {order.items && order.items.map((item, idx) => (
                <div key={idx} style={{display: "flex", alignItems: "center", gap: "15px"}}>
                  <div style={{width: "60px", height: "60px", background: "#fff", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0"}}>
                    <img src={item.image || "/Icon.png"} alt={item.name} style={{width: "100%", height: "100%", objectFit: "cover"}} onError={(e)=>{e.target.src='/Icon.png'}} />
                  </div>
                  <div style={{flex: 1}}>
                    <h4 style={{fontSize: "1rem", fontWeight: 700, margin: "0 0 5px 0", color: "#1e293b"}}>{item.name}</h4>
                    <div style={{color: "#64748b", fontSize: "0.9rem"}}>Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
              
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid #e2e8f0"}}>
                <div>
                  <span style={{color: "#64748b", fontSize: "0.9rem", marginRight: "10px"}}>Payment: {order.payment_method}</span>
                  <span style={{color: "#FEA603", fontWeight: "bold", fontSize: "1.1rem"}}>Total: ₹{parseFloat(order.total_amount).toLocaleString()}</span>
                </div>
                {order.order_status === 'Delivered' && (
                  <button 
                    onClick={() => handleDownloadInvoice(order)}
                    style={{
                      background: "#FEA603", color: "#fff", border: "none", 
                      padding: "8px 16px", borderRadius: "8px", cursor: "pointer",
                      fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px",
                      fontSize: "0.9rem"
                    }}
                  >
                    <span>📄</span> Download Invoice
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
