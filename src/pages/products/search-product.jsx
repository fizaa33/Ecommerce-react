import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import '../layout.css'
import './product.css'
import '../media.css'
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { rootStore } from '../../stores';
import ProductCard from '../../components/product-card';

const SearchProducts = observer(()=>{
    const productStore = rootStore.productStore;
    const {query} = useParams();
useEffect(()=>{
    productStore.getSearchedProducts(query);
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
                {productStore.searchedProduct.map((val)=>{
                    return <ProductCard key={val.id} product={val}  />
                })}
            </div>
          </div>
    
    </Container>
  );
})
export default SearchProducts
