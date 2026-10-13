import React, { useState, useEffect } from 'react';

const API_BASE = "http://localhost/assinment/php-backend/api";

const Stepper = ({ currentStep, setStep }) => {
  const steps = [
    { id: 'address', label: 'Address', stepNum: 1 },
    { id: 'summary', label: 'Confirm details', stepNum: 2 },
    { id: 'payment', label: 'Payment', stepNum: 3 }
  ];

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', background: '#fff', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 10 }}>
      {steps.map((s, idx) => (
        <React.Fragment key={s.id}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: idx <= currentIndex ? 'pointer' : 'default' }} onClick={() => idx <= currentIndex && setStep(s.id)}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: idx < currentIndex ? '#fff' : idx === currentIndex ? '#2874f0' : '#f0f0f0',
              border: idx < currentIndex ? '2px solid #2874f0' : 'none',
              color: idx === currentIndex ? '#fff' : idx < currentIndex ? '#2874f0' : '#878787',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold'
            }}>
              {idx < currentIndex ? '✓' : s.stepNum}
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '5px', fontWeight: idx === currentIndex ? 'bold' : 'normal', color: idx <= currentIndex ? '#000' : '#878787' }}>
              {s.label}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div style={{ flex: 1, height: '2px', background: idx < currentIndex ? '#2874f0' : '#e0e0e0', margin: '0 10px', alignSelf: 'flex-start', marginTop: '11px' }}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('cart'); // cart, address, summary, payment, success
  
  const user = JSON.parse(localStorage.getItem("authUser") || "{}");
  const [address, setAddress] = useState({ name: user.name || '', phone: '', email: user.email || '', address: '', city: '', pincode: '' });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const fetchCart = () => {
    if (!user.id) return;
    setLoading(true);
    fetch(`${API_BASE}/cart.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  const fetchAddresses = () => {
    if (!user.id) return;
    fetch(`${API_BASE}/addresses.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setSavedAddresses(data);
          if (data.length > 0 && !address.address) {
             const first = data[0];
             setAddress({ name: user.name || '', phone: first.phone || '', email: user.email || '', address: first.address_line, city: first.city, pincode: first.zip });
          } else if (data.length === 0) {
             setShowNewAddressForm(true);
          }
        }
      });
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const handleSaveAddress = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/addresses.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        ...address
      })
    })
    .then(res => res.json())
    .then(data => {
      fetchAddresses();
      setShowNewAddressForm(false);
      setStep('summary');
    });
  };

  const handleRemove = (cartId) => {
    fetch(`${API_BASE}/cart.php`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cartId })
    })
    .then(res => res.json())
    .then(() => {
      fetchCart();
      window.dispatchEvent(new Event('cartUpdated'));
    });
  };

  const updateQuantity = (cartId, currentQty, delta) => {
    const newQty = parseInt(currentQty, 10) + delta;
    if (newQty <= 0) {
      handleRemove(cartId);
      return;
    }
    fetch(`${API_BASE}/cart.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart_id: cartId, quantity: newQty })
    })
    .then(res => res.json())
    .then(() => {
      fetchCart();
      window.dispatchEvent(new Event('cartUpdated'));
    });
  };

  const handleMoveToWishlist = (cartId, productId) => {
    fetch(`${API_BASE}/wishlist.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, product_id: productId })
    }).then(() => {
      handleRemove(cartId);
    });
  };

  const placeOrder = () => {
    if (paymentMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        alert("Please enter a valid UPI ID (e.g., yourname@bank).");
        return;
      }
    } else if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        alert("Please enter a valid 16-digit Card Number.");
        return;
      }
      if (cardExpiry.length !== 5 || !cardExpiry.includes('/')) {
        alert("Please enter a valid Expiry Date in MM/YY format.");
        return;
      }
      if (cardCvv.length !== 3) {
        alert("Please enter a valid 3-digit CVV.");
        return;
      }
    }
    if (paymentMethod === 'razorpay') {
      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      loadRazorpayScript().then((res) => {
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }

        const options = {
          key: "rzp_test_MaUXvIYsJUhxbs", // User's Razorpay test key
          amount: subtotal * 100, // Amount in paise
          currency: "INR",
          name: "MotoMax",
          description: "Test Transaction",
          image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7",
          handler: function (response) {
            // Payment succeeded
            saveOrderToDB();
          },
          prefill: {
            name: address.name,
            email: user.email || "",
            contact: address.phone || "",
          },
          theme: {
            color: "#FEA603",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
      return;
    }

    saveOrderToDB();
  };

  const saveOrderToDB = () => {
    const finalEmail = (address && address.email) || user.email || "";
    const finalName = (address && address.name) || user.name || "";
    fetch(`${API_BASE}/orders.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        customer_email: finalEmail,
        customer_name: finalName,
        items: cartItems,
        address: address,
        payment_method: paymentMethod,
        total_amount: subtotal
      })
    })
    .then(res => res.json())
    .then(data => {
      cartItems.forEach(item => handleRemove(item.cart_id));
      window.dispatchEvent(new Event('cartUpdated'));
      setStep('success');
    });
  };

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^\d.-]/g, '')) || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);

  if (loading && step === 'cart') return <div style={{padding: '50px', textAlign: 'center'}}>Loading cart...</div>;

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'Roboto, Arial, sans-serif' }}>
      
      {/* HEADER FOR CHECKOUT STEPS */}
      {step !== 'cart' && step !== 'success' && (
        <Stepper currentStep={step} setStep={setStep} />
      )}

      {cartItems.length === 0 && step !== 'success' ? (
        <div style={{background: '#fff', padding: '40px', textAlign: 'center', margin: '20px', borderRadius: '4px'}}>
          <div style={{fontSize: '4rem'}}>🛒</div>
          <h3 style={{marginTop: '10px', fontSize: '1.2rem'}}>Your Cart is Empty</h3>
          <p style={{color: '#878787', fontSize: '0.9rem', marginTop: '5px'}}>Looks like you haven't added anything to your cart yet.</p>
          <button onClick={() => window.location.href = '/products'} style={{marginTop: '20px', background: '#2874f0', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '2px', fontWeight: 'bold'}}>Shop Now</button>
        </div>
      ) : step === 'success' ? (
        <div style={{textAlign: "center", padding: "60px 20px", background: '#fff', borderRadius: '8px', margin: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize: "4rem", marginBottom: "15px"}}>🎉</div>
          <h2 style={{fontSize: "1.8rem", fontWeight: "bold", color: "#166534", marginBottom: "10px"}}>Order Placed Successfully!</h2>
          <p style={{color: "#475569", fontSize: "1rem", maxWidth: "550px", margin: "0 auto 15px", lineHeight: 1.5}}>
            Thank you for shopping with MotoMax EV! An order confirmation email with your itemized invoice has been dispatched to your email address, and our administration team has received your order.
          </p>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '10px 20px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '25px'}}>
            <span>✉️</span> Order Confirmation Email Dispatched & Admin Alert Sent
          </div>
          <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button onClick={() => window.location.href = "/dashboard?tab=orders"} style={{background: '#2874f0', color: '#fff', padding: '12px 25px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}>View My Orders</button>
            <button onClick={() => window.location.href = "/"} style={{background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '12px 25px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}>Return to Home</button>
          </div>
        </div>
      ) : (
        <>
          {/* ----------------- CART VIEW ----------------- */}
          {step === 'cart' && (
            <div style={{ paddingBottom: '90px' }}>
              <div style={{background: '#fff', padding: '15px 20px', borderBottom: '1px solid #f0f0f0', fontWeight: 'bold', fontSize: '1.1rem'}}>
                My Cart ({cartItems.length})
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {cartItems.map((item) => (
                  <div key={item.cart_id} style={{background: '#fff', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <div style={{display: 'flex', gap: '15px'}}>
                      <div style={{width: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{width: '80px', height: '80px', marginBottom: '10px'}}>
                          <img src={item.image || "/Icon.png"} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                        </div>
                        <div style={{display: "flex", alignItems: "center", border: "1px solid #c2c2c2", borderRadius: "2px", overflow: 'hidden'}}>
                           <button onClick={() => updateQuantity(item.cart_id, item.quantity, -1)} style={{padding: "2px 8px", background: "#fff", border: "none", borderRight: "1px solid #c2c2c2", cursor: "pointer"}}>-</button>
                           <span style={{padding: "2px 10px", fontSize: '0.9rem'}}>{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.cart_id, item.quantity, 1)} style={{padding: "2px 8px", background: "#fff", border: "none", borderLeft: "1px solid #c2c2c2", cursor: "pointer"}}>+</button>
                        </div>
                      </div>
                      <div style={{flex: 1}}>
                        <div style={{fontSize: '0.95rem', color: '#212121', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{item.name}</div>
                        <div style={{color: '#878787', fontSize: '0.8rem', marginTop: '5px'}}>Seller: MotoMax</div>
                        <div style={{display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '10px'}}>
                          <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>₹{parsePrice(item.price).toLocaleString()}</span>
                        </div>
                        <div style={{color: '#388e3c', fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold'}}>2 offers applied</div>
                        <div style={{fontSize: '0.8rem', marginTop: '8px', color: '#212121'}}>
                          <span style={{marginRight: '5px'}}>🚚</span> Delivery by <b>Tommorrow</b>
                        </div>
                      </div>
                    </div>
                    <div style={{display: 'flex', borderTop: '1px solid #f0f0f0'}}>
                      <button onClick={() => handleRemove(item.cart_id)} style={{flex: 1, padding: '12px 0', border: 'none', borderRight: '1px solid #f0f0f0', background: '#fff', color: '#878787', fontWeight: 'bold', cursor: 'pointer'}}>Remove</button>
                      <button onClick={() => handleMoveToWishlist(item.cart_id, item.product_id)} style={{flex: 1, padding: '12px 0', border: 'none', background: '#fff', color: '#878787', fontWeight: 'bold', cursor: 'pointer'}}>Move to Wishlist</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <style>
                {`
                  .cart-bottom-bar {
                    position: fixed; bottom: 0; left: 280px; right: 0;
                    background: #fff; padding: 10px 15px; display: flex;
                    justify-content: space-between; align-items: center;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                    z-index: 50;
                  }
                  @media (max-width: 900px) {
                    .cart-bottom-bar { left: 0; }
                  }
                `}
              </style>
              <div className="cart-bottom-bar">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>₹{subtotal.toLocaleString()}</span>
                  <span style={{color: '#388e3c', fontSize: '0.8rem', fontWeight: 'bold'}}>View price details</span>
                </div>
                <button onClick={() => setStep('address')} style={{background: '#ffc200', color: '#000', border: 'none', padding: '12px 30px', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', cursor: 'pointer'}}>Proceed to buy</button>
              </div>
            </div>
          )}

          {/* ----------------- ADDRESS VIEW ----------------- */}
          {step === 'address' && (
            <div style={{padding: '10px', background: '#f1f3f6', paddingBottom: '90px'}}>
              {savedAddresses.length > 0 && !showNewAddressForm ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  {savedAddresses.map((addr, idx) => (
                    <div key={idx} style={{background: '#fff', padding: '15px', borderRadius: '4px', border: address.address === addr.address_line ? '1px solid #2874f0' : '1px solid transparent'}}>
                      <div style={{display: 'flex', alignItems: 'flex-start', gap: '15px', cursor: 'pointer'}} onClick={() => {
                        setAddress({ name: user.name || '', phone: addr.phone || '', address: addr.address_line, city: addr.city, pincode: addr.zip });
                      }}>
                        <input type="radio" checked={address.address === addr.address_line} readOnly style={{marginTop: '4px'}} />
                        <div style={{flex: 1}}>
                          <div style={{fontWeight: 'bold', marginBottom: '5px', fontSize: '0.95rem'}}>{user.name} <span style={{color: '#878787', fontWeight: 'normal', marginLeft: '10px'}}>{addr.phone}</span></div>
                          <div style={{color: '#212121', fontSize: '0.85rem', lineHeight: 1.4}}>{addr.address_line}, {addr.city} - {addr.zip}</div>
                        </div>
                        <div style={{color: '#2874f0', fontWeight: 'bold', fontSize: '0.85rem'}}>Edit</div>
                      </div>
                      {address.address === addr.address_line && (
                        <button onClick={() => setStep('summary')} style={{width: '100%', marginTop: '15px', background: '#fb641b', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', fontSize: '1rem', borderRadius: '2px', cursor: 'pointer'}}>Deliver Here</button>
                      )}
                    </div>
                  ))}
                  <div style={{background: '#fff', padding: '15px', color: '#2874f0', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px'}} onClick={() => setShowNewAddressForm(true)}>
                    + Add a new address
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSaveAddress} style={{background: '#fff', padding: '20px', borderRadius: '4px'}}>
                <h3 style={{color: '#2874f0', marginBottom: '20px', fontSize: '1rem', fontWeight: 'bold'}}>ADD A NEW ADDRESS</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                  <input type="text" placeholder="Full Name" style={{padding: '12px', border: '1px solid #c2c2c2', borderRadius: '2px'}} required value={address.name} onChange={e=>setAddress({...address, name: e.target.value})} />
                  <input type="email" placeholder="Email Address (for order tracking & invoice)" style={{padding: '12px', border: '1px solid #c2c2c2', borderRadius: '2px'}} value={address.email || ''} onChange={e=>setAddress({...address, email: e.target.value})} />
                  <input type="tel" placeholder="Phone Number" style={{padding: '12px', border: '1px solid #c2c2c2', borderRadius: '2px'}} required value={address.phone} onChange={e=>setAddress({...address, phone: e.target.value})} />
                  <textarea placeholder="Road name, Area, Colony" style={{padding: '12px', border: '1px solid #c2c2c2', borderRadius: '2px', minHeight: '80px'}} required value={address.address} onChange={e=>setAddress({...address, address: e.target.value})}></textarea>
                  <div style={{display: 'flex', gap: '15px'}}>
                    <input type="text" placeholder="City" style={{flex: 1, padding: '12px', border: '1px solid #c2c2c2', borderRadius: '2px'}} required value={address.city} onChange={e=>setAddress({...address, city: e.target.value})} />
                    <input type="text" placeholder="Pincode" style={{flex: 1, padding: '12px', border: '1px solid #c2c2c2', borderRadius: '2px'}} required value={address.pincode} onChange={e=>setAddress({...address, pincode: e.target.value})} />
                  </div>
                </div>
                <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                  <button type="submit" style={{flex: 1, background: "#fb641b", color: "#fff", border: "none", padding: "12px", fontWeight: "bold", fontSize: "1rem", borderRadius: "2px"}}>Save Address</button>
                  {savedAddresses.length > 0 && (
                    <button type="button" onClick={() => setShowNewAddressForm(false)} style={{flex: 1, background: "#fff", color: "#212121", border: "1px solid #c2c2c2", padding: "12px", fontWeight: "bold", fontSize: "1rem", borderRadius: "2px"}}>Cancel</button>
                  )}
                </div>
              </form>
              )}
            </div>
          )}

          {/* ----------------- SUMMARY VIEW ----------------- */}
          {step === 'summary' && (
            <div style={{padding: '10px', background: '#f1f3f6', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '90px'}}>
              <div style={{background: '#fff', padding: '15px', borderRadius: '4px'}}>
                <div style={{color: '#878787', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px'}}>Delivering to</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div>
                    <div style={{fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <span style={{fontSize: '1.2rem'}}>🏢</span> {address.name}
                    </div>
                    <div style={{color: '#212121', fontSize: '0.85rem', marginTop: '5px', lineHeight: 1.4}}>{address.address}, {address.city} - {address.pincode}</div>
                    <div style={{color: '#212121', fontSize: '0.85rem', marginTop: '5px'}}>📞 {address.phone}</div>
                  </div>
                  <button onClick={() => setStep('address')} style={{color: '#2874f0', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>Change</button>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item.cart_id} style={{background: '#fff', padding: '15px', borderRadius: '4px'}}>
                  <div style={{display: 'flex', gap: '15px'}}>
                    <div style={{width: '70px', height: '70px'}}>
                      <img src={item.image || "/Icon.png"} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: '0.95rem', color: '#212121'}}>{item.name}</div>
                      <div style={{display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '10px'}}>
                        <span style={{fontSize: '1.1rem', fontWeight: 'bold'}}>₹{parsePrice(item.price).toLocaleString()}</span>
                      </div>
                      <div style={{fontSize: '0.8rem', marginTop: '8px', color: '#212121'}}>
                         Delivery by <b>Tommorrow</b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>₹{subtotal.toLocaleString()}</span>
                  <span style={{color: '#388e3c', fontSize: '0.8rem', fontWeight: 'bold'}}>View price details</span>
                </div>
                <button onClick={() => setStep('payment')} style={{background: '#ffc200', color: '#000', border: 'none', padding: '12px 30px', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', cursor: 'pointer'}}>Continue</button>
              </div>
            </div>
          )}

          {/* ----------------- PAYMENT VIEW ----------------- */}
          {step === 'payment' && (
            <div style={{padding: '10px', background: '#f1f3f6', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <div style={{background: '#fff', padding: '15px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                   <div style={{color: '#878787', fontSize: '0.8rem', fontWeight: 'bold'}}>Total Amount</div>
                   <div style={{fontWeight: 'bold', fontSize: '1.2rem', color: '#2874f0'}}>₹{subtotal.toLocaleString()}</div>
                </div>
                <div style={{color: '#878787', fontSize: '0.8rem'}}>View details ˅</div>
              </div>

              <div style={{background: '#fff', borderRadius: '4px', overflow: 'hidden'}}>
                {/* UPI Option */}
                <div style={{borderBottom: '1px solid #f0f0f0'}}>
                  <label style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', cursor: 'pointer', background: paymentMethod === 'upi' ? '#f5faff' : '#fff'}}>
                    <input type="radio" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} style={{width: '18px', height: '18px'}} />
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 'bold', fontSize: '0.95rem'}}>UPI</div>
                      <div style={{color: '#878787', fontSize: '0.8rem', marginTop: '2px'}}>Pay via PhonePe, Google Pay, etc.</div>
                    </div>
                  </label>
                  {paymentMethod === 'upi' && (
                    <div style={{padding: '10px 15px 15px 15px', background: '#f5faff', marginLeft: 'auto'}}>
                      <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', maxWidth: '350px'}}>
                        <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={e => setUpiId(e.target.value)} style={{flex: '1 1 200px', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '0.9rem'}} />
                        <button type="button" onClick={() => { if(upiId.includes('@')) alert('UPI ID Verified Successfully!'); else alert('Invalid UPI ID'); }} style={{flex: '1 1 80px', padding: '10px 20px', background: '#2874f0', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}>Verify</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div style={{borderBottom: '1px solid #f0f0f0'}}>
                  <label style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', cursor: 'pointer', background: paymentMethod === 'card' ? '#f5faff' : '#fff'}}>
                    <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} style={{width: '18px', height: '18px'}} />
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 'bold', fontSize: '0.95rem'}}>Credit / Debit / ATM Card</div>
                      <div style={{color: '#388e3c', fontSize: '0.8rem', marginTop: '2px', fontWeight: 'bold'}}>Save upto ₹500 • 3 offers available</div>
                    </div>
                  </label>
                  {paymentMethod === 'card' && (
                    <div style={{padding: '10px 15px 15px 15px', background: '#f5faff', display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: 'auto'}}>
                      
                      {/* Interactive Card UI */}
                      <div style={{width: '100%', maxWidth: '320px', height: '180px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '15px', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', marginBottom: '10px', alignSelf: 'center', boxSizing: 'border-box'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div style={{fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 'bold'}}>Bank</div>
                          <div style={{width: '40px', height: '30px', background: '#cbd5e1', borderRadius: '4px'}}></div>
                        </div>
                        <div>
                          <div style={{letterSpacing: '2px', fontSize: '1.2rem', fontFamily: 'monospace', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                            {cardNumber ? cardNumber.match(/.{1,4}/g).join(' ') : 'XXXX XXXX XXXX XXXX'}
                          </div>
                          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '0.8rem'}}>
                            <div>
                              <div style={{color: '#94a3b8', fontSize: '0.65rem', textTransform: 'uppercase'}}>Card Holder</div>
                              <div style={{fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px'}}>{address.name || 'YOUR NAME'}</div>
                            </div>
                            <div style={{textAlign: 'right'}}>
                              <div style={{color: '#94a3b8', fontSize: '0.65rem', textTransform: 'uppercase'}}>Expires</div>
                              <div style={{fontWeight: 'bold'}}>{cardExpiry || 'MM/YY'}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{maxWidth: '350px', alignSelf: 'center', width: '100%'}}>
                        <input type="text" placeholder="Card Number (16 Digits)" value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} style={{width: '100%', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box', marginBottom: '10px'}} />
                        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                          <input type="text" placeholder="Valid Thru (MM/YY)" value={cardExpiry} onChange={e => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            setCardExpiry(val);
                          }} style={{flex: '1 1 120px', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box'}} />
                          <input type="password" placeholder="CVV" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} maxLength="3" style={{flex: '1 1 80px', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box'}} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Razorpay Option */}
                <div style={{borderBottom: '1px solid #f0f0f0'}}>
                  <label style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', cursor: 'pointer', background: paymentMethod === 'razorpay' ? '#f5faff' : '#fff'}}>
                    <input type="radio" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} style={{width: '18px', height: '18px'}} />
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 'bold', fontSize: '0.95rem'}}>Razorpay (Cards / UPI / Netbanking)</div>
                      <div style={{color: '#878787', fontSize: '0.8rem', marginTop: '2px'}}>Secure payment via Razorpay Checkout</div>
                    </div>
                  </label>
                </div>

                {/* COD Option */}
                <div>
                  <label style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', cursor: 'pointer', background: paymentMethod === 'cod' ? '#f5faff' : '#fff'}}>
                    <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{width: '18px', height: '18px'}} />
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 'bold', fontSize: '0.95rem'}}>Cash on Delivery</div>
                      <div style={{color: '#878787', fontSize: '0.8rem', marginTop: '2px'}}>Pay when you receive the product</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="cart-bottom-bar">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>₹{subtotal.toLocaleString()}</span>
                  <span style={{color: '#388e3c', fontSize: '0.8rem', fontWeight: 'bold'}}>View price details</span>
                </div>
                <button onClick={placeOrder} style={{background: '#ffc200', color: '#000', border: 'none', padding: '12px 30px', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', cursor: 'pointer'}}>Place Order</button>
              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default Cart;
