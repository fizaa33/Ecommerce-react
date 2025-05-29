import React, { useEffect, useState } from 'react';
import { Nav, Tab, Card, Modal, Form, Spinner } from 'react-bootstrap';
import './cart.css'
import '../media.css'
import { rootStore } from '../../stores';
import CartCard from '../../components/cart-card';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

const Cart = observer(() => {
  const cartStore = rootStore.cartStore;
  const addressStore = rootStore.addressStore;
  const orderStore = rootStore.orderStore;
  const authStore = rootStore.authStore;
  let profile = authStore.profile;
  const [activeTab, setActiveTab] = useState("cart1");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");
  const [coupon, setCoupon] = useState("");
  let discount = 0;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const totalPrice = cartStore.cart.reduce((acc, item) => acc + item.totalPrice, 0);
  let discountedPrice = orderStore.discountedPrice;
  let navigate = useNavigate();
  if (discountedPrice) {
    discount = totalPrice - discountedPrice || 0;
  }
  const LatestAddress = addressStore.latestAddress || {};


  useEffect(() => {
    cartStore.getUserCart();
    addressStore.getAddress();
    authStore.UserProfile();
  }, [])
  async function handleAddress() {
    const data = {
      street, city, postalCode, region
    }
    await addressStore.addAddress(data);
    setShowAddressModal(false);
  }
  const requestData = cartStore.cart.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    couponId: item.couponId
  }));

  async function handleApplyCoupon() {
    await orderStore.ApplyCoupon({ coupon, requestData });

  }
  async function confirmOrder() {
    let items = cartStore.cart;
    let city = LatestAddress.city;
    let street = LatestAddress.street;
    let postalCode = LatestAddress.postalCode;
    let region = LatestAddress.region;
    const data = { city, street, postalCode, region, items };
    let res = await orderStore.CreateOrder({ coupon, data })
    console.log(res);
    if(res.isSuccess){
            navigate("/history")
    }

  }
  return (
    <div className="container">
      <div className="nav cart-menu">
        <div className="cart-item">
          <Nav.Link
            className={activeTab === "cart1" ? "active" : ""}
            onClick={() => setActiveTab("cart1")}
          >

            <div className="icons2">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" fill="none">
                  <path d="M24 37C19.32 37 15.5 33.18 15.5 28.5C15.5 27.68 16.18 27 17 27C17.82 27 18.5 27.68 18.5 28.5C18.5 31.54 20.96 34 24 34C27.04 34 29.5 31.54 29.5 28.5C29.5 27.68 30.18 27 31 27C31.82 27 32.5 27.68 32.5 28.5C32.5 33.18 28.68 37 24 37Z" fill="#0C68F4" />
                  <path d="M10.3798 12.7599C9.99977 12.7599 9.59977 12.5999 9.31977 12.3199C8.73977 11.7399 8.73977 10.7799 9.31977 10.1999L16.5798 2.93988C17.1598 2.35988 18.1198 2.35988 18.6998 2.93988C19.2798 3.51988 19.2798 4.47988 18.6998 5.05988L11.4398 12.3199C11.1398 12.5999 10.7598 12.7599 10.3798 12.7599Z" fill="#0C68F4" />
                  <path d="M37.6202 12.7599C37.2402 12.7599 36.8602 12.6199 36.5602 12.3199L29.3002 5.05988C28.7202 4.47988 28.7202 3.51988 29.3002 2.93988C29.8802 2.35988 30.8402 2.35988 31.4202 2.93988L38.6802 10.1999C39.2602 10.7799 39.2602 11.7399 38.6802 12.3199C38.4002 12.5999 38.0002 12.7599 37.6202 12.7599Z" fill="#0C68F4" />
                  <path d="M40.42 21.2C40.28 21.2 40.14 21.2 40 21.2H39.54H8C6.6 21.22 5 21.22 3.84 20.06C2.92 19.16 2.5 17.76 2.5 15.7C2.5 10.2 6.52 10.2 8.44 10.2H39.56C41.48 10.2 45.5 10.2 45.5 15.7C45.5 17.78 45.08 19.16 44.16 20.06C43.12 21.1 41.72 21.2 40.42 21.2ZM8.44 18.2H40.02C40.92 18.22 41.76 18.22 42.04 17.94C42.18 17.8 42.48 17.32 42.48 15.7C42.48 13.44 41.92 13.2 39.54 13.2H8.44C6.06 13.2 5.5 13.44 5.5 15.7C5.5 17.32 5.82 17.8 5.94 17.94C6.22 18.2 7.08 18.2 7.96 18.2H8.44Z" fill="#0C68F4" />
                  <path d="M29.7795 45.5H17.7195C10.5595 45.5 8.95951 41.24 8.33951 37.54L5.51951 20.24C5.37951 19.42 5.93951 18.66 6.75951 18.52C7.55951 18.38 8.33951 18.94 8.47951 19.76L11.2995 37.04C11.8795 40.58 13.0795 42.5 17.7195 42.5H29.7795C34.9195 42.5 35.4995 40.7 36.1595 37.22L39.5195 19.72C39.6795 18.9 40.4595 18.36 41.2795 18.54C42.0995 18.7 42.6195 19.48 42.4595 20.3L39.0995 37.8C38.3195 41.86 37.0195 45.5 29.7795 45.5Z" fill="#0C68F4" />
                </svg>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="58" height="2" viewBox="0 0 58 2" fill="none">
                <path d="M1 1H57" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="cart-text">Cart</span>
          </Nav.Link>
        </div>
        <div className="cart-item">
          <Nav.Link
            className={activeTab === "checkout" ? "active" : ""}
            style={{ textAlign: "right" }}
          >

            <div className="icons2">
              <svg xmlns="http://www.w3.org/2000/svg" width="58" height="2" viewBox="0 0 58 2" fill="none">
                <path d="M1 1H57" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M17.3327 19.6667H2.66602C2.11935 19.6667 1.66602 19.2134 1.66602 18.6667V8.00008C1.66602 4.50675 4.50602 1.66675 7.99935 1.66675H19.9993C20.546 1.66675 20.9993 2.12008 20.9993 2.66675V16.0001C20.9993 18.0267 19.3593 19.6667 17.3327 19.6667ZM3.66602 17.6667H17.3327C18.2527 17.6667 18.9993 16.9201 18.9993 16.0001V3.66675H7.99935C5.61268 3.66675 3.66602 5.61341 3.66602 8.00008V17.6667Z" fill="white" />
                  <path d="M25.3327 27.6667H23.9993C23.4527 27.6667 22.9993 27.2134 22.9993 26.6667C22.9993 25.7467 22.2527 25.0001 21.3327 25.0001C20.4127 25.0001 19.666 25.7467 19.666 26.6667C19.666 27.2134 19.2127 27.6667 18.666 27.6667H13.3327C12.786 27.6667 12.3327 27.2134 12.3327 26.6667C12.3327 25.7467 11.586 25.0001 10.666 25.0001C9.74602 25.0001 8.99935 25.7467 8.99935 26.6667C8.99935 27.2134 8.54602 27.6667 7.99935 27.6667H6.66602C3.90602 27.6667 1.66602 25.4267 1.66602 22.6667V18.6667C1.66602 18.1201 2.11935 17.6667 2.66602 17.6667H17.3327C18.2527 17.6667 18.9993 16.9201 18.9993 16.0001V6.66675C18.9993 6.12008 19.4527 5.66675 19.9993 5.66675H22.4527C23.7727 5.66675 24.986 6.37343 25.6394 7.5201L27.9194 11.5068C28.0927 11.8134 28.0927 12.2001 27.9194 12.5068C27.746 12.8134 27.4127 13.0001 27.0527 13.0001H25.3327C25.146 13.0001 24.9993 13.1467 24.9993 13.3334V17.3334C24.9993 17.5201 25.146 17.6667 25.3327 17.6667H29.3327C29.8793 17.6667 30.3327 18.1201 30.3327 18.6667V22.6667C30.3327 25.4267 28.0927 27.6667 25.3327 27.6667ZM24.866 25.6667H25.3327C26.986 25.6667 28.3327 24.3201 28.3327 22.6667V19.6667H25.3327C24.0527 19.6667 22.9993 18.6134 22.9993 17.3334V13.3334C22.9993 12.0534 24.0393 11.0001 25.3327 11.0001L23.906 8.50675C23.6127 7.98675 23.0527 7.66675 22.4527 7.66675H20.9993V16.0001C20.9993 16.5467 21.4527 17.0001 21.9993 17.0001C22.546 17.0001 22.9993 17.4534 22.9993 18.0001V24.0001C22.9993 24.5467 23.4527 25.0001 23.9993 25.0001C24.546 25.0001 24.9993 25.4534 24.9993 26.0001C24.9993 26.5467 24.546 27.0001 24.9993 27.0001L26.866 24.0001C27.466 23.4001 28.3327 23.0001 29.3327 23.0001H28.3327C28.8793 23.0001 29.3327 23.4534 29.3327 24.0001C29.3327 24.5467 29.8793 25.0001 30.3327 25.0001Z" fill="white" />
                </svg>
              </span>
            </div>
            <span className="cart-text">Checkout</span>
          </Nav.Link>
        </div>
      </div>
      <Tab.Content>
        <Tab.Pane active={activeTab === "cart1"}>
          <div className="cart-inner">
            <div className="cart-cards">

              {cartStore.cart.map((data) => {
                return <CartCard key={data.id} item={data} />

              })
              }
            </div>

            <div className="card cart-price">
              <h4>Payment Details</h4>
              <div className="addcrtprice">
                <span>Subtotal</span><span className="subtotal-price">${totalPrice}</span>
              </div>
              <div className="addcrtprice">
                <span>Discount</span><span className="discount-price">$0</span>
              </div>
              <div className="addcrtprice">
                <span>Shipment cost</span><span className="shipment-cost">$0</span>
              </div>
              <hr />

              <div className="grandprice">
                <h5>Grand Total</h5>
                <span className="grand-total-price">${totalPrice}</span>
              </div>

              <button className="btn btn-primary mt-3" onClick={() => setActiveTab("checkout")}>
                Proceed to Checkout
              </button>

            </div>
          </div>
        </Tab.Pane>
        <Tab.Pane active={activeTab === "checkout"}>
          <div className="checkout-main">
            <div className="checkout-cart">
              <h5>Name</h5>
              <input className="form-control mb-3" type="text" placeholder="Your name" value={profile.fullName} readOnly />

              <h5>Ship to</h5>
              <div className="address1">
                <span id="completeAddress">{LatestAddress.street} , {LatestAddress.city}, {LatestAddress.region}</span>
                <img src="assets/images/edit.svg" alt="" onClick={() => setShowAddressModal(true)} />
              </div>

              <h5>Payment</h5>
              <div className="container cart-div form-control" >
                <span><input type="radio" name="r1" /></span>
                <span>Cash on Delivery</span>

              </div>

            </div>
            <div className="checkout-cart2">
              <h4>Your Order</h4>
              <div className="checkout-products">
                {cartStore.cart.map((item) => {
                  return (<div key={item.id} className='div1 mt-3'>
                    <div className="cartItem-img">
                      <img className="cart-drop-img" src={`https://ecomerceapis.runasp.net/${item.productImages[0]}`} alt="${item.productName}" />
                    </div>
                    <div className="div1-1">
                      <h5>{item.productName || "Product Name"}</h5>
                      <div className="pricedetail">
                        <div className="addprice">
                          <span className="linethrough">$ {item.price || 0}</span>
                          <span>$ {item.totalPrice || 0}</span>
                        </div>
                        <div className="deleteprice">

                          <div className="underline">

                            <span className="item-quantity">{item.quantity || 1}</span>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)
                })
                }
              </div>

              <div id="getCoupons">

              </div>

              <div className="grandprice my-4">
                <input type="text" className="form-control discount-code-input" placeholder="discount code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                <button className="btn btn-outline-primary apply-coupon" onClick={handleApplyCoupon}>
                  {orderStore.loading ? <Spinner animation="border" variant="light" /> : "Apply"}</button>
              </div>
              <div className="addcrtprice">
                <span>Subtotal</span><span className="subtotal">${totalPrice}</span>
              </div>
              <div className="addcrtprice">
                <span>Discount</span><span className="final-discount">-${discount.toFixed(2) || 0}</span>
              </div>
              <div className="addcrtprice">
                <span>Shipment cost</span><span>$0.00</span>
              </div>
              <hr />

              <div className="grandprice">
                <h5>Grand Total</h5>
                <span className="final-grand-price">${discountedPrice ? discountedPrice : totalPrice}</span>
              </div>

              <button onClick={confirmOrder} className="btn btn-primary mt-3 w-100" >{orderStore.loading ? <Spinner animation="border" variant="light" /> : "Confirm order"}</button>

            </div>
          </div>
        </Tab.Pane>
      </Tab.Content>
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
        <Modal.Header closeButton>

          <h5>Address Details</h5>

        </Modal.Header>
        <Modal.Body>
          <span>Enter your details</span>
          <input
            name="street"
            className="login-inputs"
            type="text"
            placeholder="Street name and house number"
            value={street}
            onChange={(e) => setStreet(e.target.value)}

          />
          <input
            name="city"
            className="login-inputs"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}

          />
          <input
            name="postal"
            className="login-inputs"
            type="text"
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}

          />
          <input
            name="region"
            className="login-inputs"
            type="text"
            placeholder="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}

          />


          <div className="buttons my-4">
            <button type="button" className="btn btn-outline-primary w-100" onClick={() => setShowAddressModal(false)} >
              Back
            </button>
            <button type="button" className="btn btn-primary w-100" onClick={handleAddress}>
              {addressStore.loading ? <Spinner animation="border" variant="light" /> : "Submit"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>


  );
})
export default Cart
