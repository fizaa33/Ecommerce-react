import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import Index from '../pages/index'
import UserDetail from '../pages/user/user-account'
import History from '../pages/order/history'
import Wishlist from '../pages/order/wishlist'
import Cart from '../pages/order/cart'
import Products from '../pages/products/products'
import ProductDetail from '../pages/products/product-detail'
import OrderStatus from '../pages/order/order-status'
import HeaderNavbar from '../components/navbar'
import SearchProducts from '../pages/products/search-product'
import CategoryProducts from '../pages/products/category-products'
import DiscountProducts from '../pages/products/discount-products'
export default function PageRouter() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    return (
       <>
       <HeaderNavbar setShowLoginModal={setShowLoginModal} showLoginModal={showLoginModal} />
        <Routes>
        <Route
          index
          element={<Index setShowLoginModal={setShowLoginModal} />}
        />
        <Route path='/account' element={<UserDetail />} />
        <Route path='/history' element={<History />} />
        <Route path='/wishlist' element={<Wishlist setShowLoginModal={setShowLoginModal} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/search/:query' element={<SearchProducts />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/discountedProducts' element={<DiscountProducts setShowLoginModal={setShowLoginModal} />} />
        <Route path='/order/status/:id' element={<OrderStatus />} />
        <Route path='/category/products/:categoryId/:value' element={<CategoryProducts setShowLoginModal={setShowLoginModal} />} />
        </Routes>
        </>

       

    )
}
