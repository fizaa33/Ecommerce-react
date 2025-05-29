import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import '../layout.css'
import './product.css'
import '../media.css'
import { observer } from 'mobx-react-lite';
import { rootStore } from '../../stores';
import ProductCard from '../../components/product-card';

 const Products = observer(()=>{
  const productStore = rootStore.productStore;
  useEffect(()=>{
    productStore.ShowProducts();
  }, [])
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
               {productStore.products.map((data)=>{
return <ProductCard key={data.id} product={data} />
               })}
            </div>
          </div>
    
    </Container>
  );
})
export default Products
