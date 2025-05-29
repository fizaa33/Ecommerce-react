import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Offcanvas, Modal, Button, Form, Tab, Tabs, Spinner } from 'react-bootstrap';

import './index.css';
import { rootStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { Link, useLocation, useNavigate } from 'react-router';
import CartCard from '../cart-card';

const HeaderNavbar = observer(({ showLoginModal, setShowLoginModal }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [query, setQuery] = useState("");
  const authStore = rootStore.authStore;
  const productStore = rootStore.productStore;
  const categoryStore = rootStore.categoryStore;
  const cartStore = rootStore.cartStore;
  const totalPrice = cartStore.cart.reduce((acc, item) => acc + item.totalPrice, 0);
  let profile = authStore.profile;
  const navigate = useNavigate(); 
  const location = useLocation();
    useEffect(() => {
    productStore.showMostSearchedItems();
    cartStore.getUserCart()
    authStore.UserProfile();
  }, [location])

  const handleSearch = () => {
    navigate(`/product/search/${query}`)
    setShowSearchModal(false);
  }

  const handleSignup = async () => {
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (!fullName || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }
    let data = {
      fullName,
      email,
      password,
      phoneNumber,
    };
    await authStore.signup(data);
    setName("");
    setEmail("");
    setPassword("");
    setNumber("");
  }
  useEffect(() => {
    const firstParentCategory = categoryStore.category.find(
      (category) => category.parentId === null
    );
    if (firstParentCategory) {
      setCategoryId(firstParentCategory.id);
    }
  }, [categoryStore.category]);


  function logoutUser() {
    if (confirm("Are you sure you want to logout?")) {
      authStore.logout();
      localStorage.removeItem("token");
      setToken(null);
      setShowProfileDropdown(false);
    }
  }
  const handleLogin = async () => {
    let loginData = {
      email,
      password,
    };
    await authStore.login(loginData);
    setEmail("");
    setPassword("");
    const newToken = localStorage.getItem("token");
  setToken(newToken);
  setShowLoginModal(false);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('#cart-dropdown') &&
        !event.target.closest('#cart') &&
        !event.target.closest('#profile-dropdown') &&
        !event.target.closest('#user') &&
        !event.target.closest('#product-dropdown') &&
        !event.target.closest('.nav-link')
      ) {
        setShowCartDropdown(false);
        setShowProfileDropdown(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div id="header">
      {/* Navbar Section */}
      <Navbar expand="lg" className="navbar">
        <div className="container">
          <Navbar.Brand as={Link} to={'/'}>
          
            <img className='logo' src="assets/images/style=primary.svg" alt="Logo" />
        
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setShowOffcanvas(true)} />
          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link as={Link} to={'/'} className='px-4'>
                 Home</Nav.Link>
               <Nav.Link as={Link} className='px-4' to={"/products"}>Products</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <div className="nav-right d-flex align-items-center">
            <img
              src="assets/images/search.svg"
              alt="Search"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowSearchModal(true)}
            />
            <img src="assets/images/delete.svg" alt="Cart" id="cart" onClick={() => setShowCartDropdown(!showCartDropdown)} />

            {token ? (
             <span onClick={() => setShowProfileDropdown(!showProfileDropdown)} style={{ cursor: 'pointer', display: 'inline-block' }}>
  <img src="assets/images/user.svg" alt="User" id="user" />
</span>

            )

              :
              (<Button
                variant="primary"
                id="loginSignupBtn"
                onClick={() => setShowLoginModal(true)}
              >
                Login/Signup
              </Button>)}
          </div>
        </div>
      </Navbar>

    
    
      {/* Profile Dropdown */}
      {showProfileDropdown && (


        <div id="profile-dropdown">
          <ul className="profile-list">
            <li>
              <Link onClick={()=> setShowProfileDropdown(false)} to="/account">
                <img src="assets/images/profile-circle.svg" alt="Profile" />
                <div className="user-name">
                  <p id="userName">{profile.fullName}</p>
                  <span id="userEmail">{profile.email}</span>
                </div>
              </Link>
            </li>
            <li>
              <Link onClick={()=> setShowProfileDropdown(false)} to="/history">
                <img src="assets/images/desktop.svg" alt="Orders" /> Orders
              </Link>
            </li>
            <li>
              <Link onClick={()=> setShowProfileDropdown(false)} to="/wishlist">
                <img src="assets/images/heart.svg" alt="Wishlist" /> Wishlist
              </Link>
            </li>
            <li >
              <Link onClick={logoutUser}>
                <img src="assets/images/desktop.svg" alt="Logout" /> Logout
              </Link>
               
            </li>
          </ul>
        </div>
      )}

      {/* Cart Dropdown */}
      {showCartDropdown && (


        <div id="cart-dropdown">
          <p className="counting">Cart Items</p>
          <div className="cart-drop-cards">
            {cartStore.cart.map((item) => {
              return <CartCard key={item.id} item={item} />
            })}
          </div>
          <div className="pricedetail mt-2 p-3">
            <div className="grand-total">
              <span className="grand">Grand total</span>
              <span className="subtotal grand-price">${totalPrice}</span>
            </div>
            <Link onClick={()=> setShowCartDropdown(false)} className="w-75" to="/cart">
              <Button variant="primary" className="w-100">
                Proceed to Cart
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill>
            <Tab eventKey="login" title="Login">
              <h3>Log in to Tech Heim</h3>
              <Form>
                <Form.Control
                  className="mb-4"
                  type="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Form.Control
                  className="mb-5"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
                <a className="mt-2 float-end" href="#">
                  Forgot Password?
                </a>
                <Form.Check
                  className="my-3"
                  type="checkbox"
                  id="login-keep-logged"
                  label="Keep me logged in"
                  defaultChecked
                />
                <Button
                  onClick={handleLogin}
                  className="w-100 my-2 p-2"
                  variant="primary"
                >
                  {authStore.loading ? <Spinner animation="border" variant="light" /> : "Log In"}
                </Button>
              </Form>
              <p className="mt-3 text-secondary text-center">
                Don’t have an account?{" "}
                <Nav.Link eventKey="signup" className="d-inline text-primary">
                  Sign up
                </Nav.Link>
              </p>

            </Tab>
            <Tab eventKey="signup" title="Signup">
              <h3>Create your account</h3>
              <Form>
                <Form.Control
                  value={fullName} onChange={(e) => setName(e.target.value)}
                  className="mb-3"
                  type="text"
                  placeholder="Full Name"
                />
                <Form.Control
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                  type="email"
                  placeholder="Email"
                />
                <Form.Control
                  value={phoneNumber} onChange={(e) => setNumber(e.target.value)}
                  className="mb-3"
                  type="tel"
                  placeholder="Phone Number"
                />
                <Form.Control
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="mb-3"
                  type="password"
                  placeholder="Password"
                />
                <Form.Check
                  className="mt-3"
                  type="checkbox"
                  id="signup-terms"
                  label={
                    <>
                      I agree to all{" "}
                      <a href="#" className="text-primary">
                        Terms & Conditions
                      </a>
                    </>
                  }
                  defaultChecked
                />
                <Button
                  onClick={handleSignup}
                  className="w-100 my-2 p-2"
                  variant="primary"
                >
                  {authStore.loading ? <Spinner animation="border" variant="light" /> : "Create Account"}
                </Button>
              </Form>

              <p className="mt-3 text-secondary text-center">
                Already have an account?{" "}
                <Nav.Link eventKey="login" className="d-inline text-primary">
                  Sign in
                </Nav.Link>
              </p>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      {/* Search Modal */}
      <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)} centered>
        <Modal.Header closeButton>
          <Form.Control
            type="text" value={query}
            placeholder="What can we help you to find?"
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary ms-2">Search</button>
        </Modal.Header>
        <Modal.Body>
          <div className="search-body">
            <h5>The Most Searched Items</h5>
            <div className="popular">
              {productStore.mostSearch.map((val) => {
                return (
                  <p key={val.id}>{val.name.split(" ").slice(0, 2).join(" ")}</p>
                )
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
})

export default HeaderNavbar
