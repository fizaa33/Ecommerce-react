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

      

    

      <div className="main-container">
    
          {/* Sidebar */}
         

          {/* Content */}
        
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
   
    </Container>
  );
})
export default DiscountProducts
