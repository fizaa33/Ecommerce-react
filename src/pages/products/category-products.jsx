import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import '../layout.css'
import './product.css'
import '../media.css'
import { observer } from 'mobx-react-lite';
import { useLocation, useParams } from 'react-router';
import { rootStore } from '../../stores';
import ProductCard from '../../components/product-card';

 const CategoryProducts = observer((setShowLoginModal)=>{
const {categoryId} = useParams();
const {value} = useParams();
const productStore = rootStore.productStore;
const location = useLocation();

useEffect(()=>{
    productStore.getProductByCategory({categoryId, value});
}, [location])



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
                {productStore.categoryProduct.map((data)=>{
return <ProductCard product={data} key={data.id} setShowLoginModal={setShowLoginModal} />
                })}
            </div>
          </div>
     
    </Container>
  );
})
export default CategoryProducts
