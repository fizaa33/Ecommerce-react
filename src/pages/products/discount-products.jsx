import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import '../layout.css'
import './product.css'
import '../media.css'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite';
import { rootStore } from '../../stores';
import ProductCard from '../../components/product-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';

 const DiscountProducts = observer((setShowLoginModal)=>{
    const productStore = rootStore.productStore;
    useEffect(()=>{
        productStore.ShowDiscountedProduct();
    }, [])
      const isLoggedIn = localStorage.getItem("token");
      const wishlistStore = rootStore.wishlistStore;
      const cartStore = rootStore.cartStore;
      function addWishlist(id){
       
        console.log('Heart icon clicked'); 
    
        if(!isLoggedIn){
          setShowLoginModal(true);
          return;
        }
        else{
          wishlistStore.addToWishlist(id);
        }
      }
     
      function addCart(id){
     
        console.log('cart icon clicked'); 
    
        if(!isLoggedIn){
          setShowLoginModal(true);
          return;
        }
        else{
          cartStore.addToCart(id);
        }
      }

  return (
    <Container className="container">
      <br />
      <p className="gray-text">
        Home › <span className="blue-text">Products</span>
      </p>

      <div className="product-categories">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper"></div>
        </div>
        <div className="move swiper-button-next"></div>
        <div className="move swiper-button-prev"></div>
      </div>

      <div className="chips-container">
        <div className="chips">
          <span>Silver</span>
          <img src="assets/images/cross.svg" alt="" />
        </div>
        <div className="chips">
          <span>Intel Core i9</span>
          <img src="assets/images/cross.svg" alt="" />
        </div>
        <div className="chips">
          <span>Apple</span>
          <img src="assets/images/cross.svg" alt="" />
        </div>
        <div className="chips">
          <span>12 GB</span>
          <img src="assets/images/cross.svg" alt="" />
        </div>
        <div className="chips">
          <span>Silver</span>
          <img src="assets/images/cross.svg" alt="" />
        </div>
      </div>
      <div>
        <h5 id="filters" className="mt-4">
          <img src="assets/images/filter.svg" alt="" /> Filters
        </h5>
      </div>

      <div className="main-container">
    
          {/* Sidebar */}
          <div className="sidebar" id="sidebar">

<div className="sidebar-filter">
  <div data-bs-toggle="collapse" href="#collapseOne" className="card-header">
    <span>Brand</span>
    
      <img src="assets/images/chevron-down.svg" alt="" />
    
  </div>
  <div id="collapseOne" className="collapse show">
    <div className="card-body">
      <div className="form-check">
        <input className="form-check-input" type="checkbox"  />
        <span>Asus</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>Acer</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>Apple</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>Dell</span>
      </div>
    </div>
  </div>
</div>
<div className="sidebar-filter">
  <div data-bs-toggle="collapse" href="#collapseTwo" className="card-header">
    <span>Color</span>
   
      <img src="assets/images/chevron-down.svg" alt="" />
 
  </div>
  <div id="collapseTwo" className="collapse">
    <div className="card-body">
      <div className="form-check">
        <input className="form-check-input" type="checkbox"  />
        <span>Asus</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>Acer</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>Apple</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>Dell</span>
      </div>
    </div>
  </div>
</div>
<div className="sidebar-filter">
  <div className="card-header">
    <span>Discount</span>
    <div className="form-check form-switch m-0">
      <input
        className="form-check-input"
        type="checkbox"
        id="mySwitch"
        name="darkmode"
     
        
      />
    </div>
  </div>
</div>
<div className="sidebar-filter">
  <div data-bs-toggle="collapse" href="#collapseThree" className="card-header">
    <span>Price</span>
  
      <img src="assets/images/chevron-down.svg" alt="" />
    
  </div>
  <div id="collapseThree" className="collapse show">
    <div className="card-body">
      <div className="range-btn">
        <button className="btn btn-outline-secondary">Min.</button>
        <button className="btn btn-outline-secondary">Max.</button>
      </div>
      <input type="range" className="range"  />
    </div>
  </div>
</div>

<div className="sidebar-filter">
  <div data-bs-toggle="collapse" href="#collapseEight" className="card-header">
    <span>Drive Size</span>
   
      <img src="assets/images/chevron-down.svg" alt="" />
  
  </div>
  <div id="collapseEight" className="collapse show">
    <div className="card-body">
      <div className="form-check">
        <input className="form-check-input" type="checkbox"  />
        <span>512GB</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>256GB</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" />
        <span>64GB</span>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox"  />
        <span>128GB</span>
      </div>
    </div>
  </div>
</div>
</div>

          {/* Content */}
          <div className="content">
            <div className="product-container all-products">
                {productStore.discounted.map((product)=>{
                    return ( <div key={product.productId} className="product-card">
                        <img onClick={()=> addWishlist(product.productId)}  className="heart addWishlist" src="assets/images/heart.svg" alt="" />
                      <img onClick={()=> addCart(product.productId)} style={{top: '50px'}} className="heart addCart"  src="assets/images/delete.svg"  alt="" />
                      <Link to={`/product/${product.productId}`}>
                      <div className="image-div">
                        <img className="product-img" src={`https://ecomerceapis.runasp.net/${product.imagePaths[0]}`} alt={product.name} />
                        </div>
                      </Link>
                      <img  className="product-stroke" src="assets/images/stroke.svg" alt="" />
                      <p><Link to="/product/detail">{product.name}</Link></p>
                      <div className="price">
                        <span>${product.price}</span>
                        <span className="rating"><FontAwesomeIcon icon={faStar} /> 4.5</span>
                      </div>
                        </div>)
                })}
            </div>
          </div>
      </div>
    </Container>
  );
})
export default DiscountProducts
