import React, { useEffect } from "react";
import '../layout.css'
 import './index.css'
 import '../media.css'

 import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductCard from "../../components/product-card";
import { rootStore } from "../../stores";
import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router";

const Index = observer(({ setShowLoginModal}) =>{
  const productStore = rootStore.productStore;
  const categoryStore = rootStore.categoryStore;
  const reviewStore = rootStore.reviewStore;
 
useEffect(()=>{
  productStore.ShowProducts();
  productStore.ShowBestSellers();
  categoryStore.ShowCategory();
  productStore.ShowDiscountedProduct();
  


}, [])

  return (
    <div className="container">
      <div className="hero-section d-flex row">
        <div className="col-lg-5 col-sm-12">
          <h1 id="bannerTitle" className="heading"> "Tech Heim"</h1>
          <p id="bannerDescription" className="hero-text">
           `Join the digital revolution`
          </p>
          <Link style={{ textDecoration: "none" }} to='/products' id="exploreMore">
            <button className="hero-btn">Explore More</button>
          </Link>
        </div>
        <div className="col-lg-7 col-sm-12">
          <img
            className="hero-img"
            src= "assets/images/hero-image.svg"
            alt=""
          />
        </div>
      </div>

      <div className="categories">
        <div className="swiper mySwiperCategories">
        <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={10}
                        slidesPerView={6} 
                    >
                        {categoryStore.category.filter((category) => category.parentId === null).map((category)=>{
                          return (
                            <SwiperSlide key={category.id}>
                              <Link style={{color : "black"}} to={`/category/products/${category.id}/${true}`}>
                                <div  className="category1" style={{ cursor: 'pointer' }}>
                                    <div className="imagediv">
                                        <img
                                            src={`https://ecomerceapis.runasp.net/${category.imagePath}`}
                                            alt={category.name}
                                        />
                                    </div>
                                    <span>{category.name}</span>
                                </div>
                                </Link>
                            </SwiperSlide>
                        )}
                        )}
                    </Swiper>
        </div>
        <div className="swiper-pagination-categories"></div>
      </div>

      <div className="sales-section">
        <img
          className="random"
          src="assets/images/random-shape-in-blue-png 2.svg"
          alt=""
        />
        <div className="sale-section-text">
          <p>Products On Sale</p>
          <span>Shop Now!</span>
          <br />
          <br />
          <Link className="view-all" to="/discountedProducts">
            View all ›
          </Link>
        </div>
        <div className="swiper SwiperTwo">
          <div className="swiper-wrapper discounted-products">
          <Swiper
                         modules={[ Autoplay]}
                         slidesPerView={4} 
                         spaceBetween={10}

                         autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                        {productStore.discounted.map((product) => (
                            <SwiperSlide key={product.productId}>
                               <Link to={`/product/${product.productId}`}>
                              <div className="sale-section-card">
                               
      <div className="discount">{product.discount}</div>
      <div className="discount-img">
        <img
          src={`https://ecomerceapis.runasp.net/${product.imagePaths[0]}`}
          alt={product.productName}
        />
      </div>
      <p>{product.productName}</p>
      <div className="price">
        <span className="last-price">${product.price}</span>
        <span>${product.discountedPrice}</span>
      </div>
    </div>
      </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
          </div>
        </div>
      </div>

      <div className="product-header">
        <h2>New Products</h2>
        <Link className="view-all view-black" to="/products">
          View all ›
        </Link>
      </div>
      <hr />
      <div className="all-products">
        {productStore.products.slice(0,4).map((data)=>{
         return   <ProductCard key={data.id} product={data} setShowLoginModal={setShowLoginModal}/>
        
        })}
      
      </div>

      <div className="iphone_15">
        <div className="lft-side">
          <div className="left-1">
            <h5 style={{ marginBottom: "30px" }}>
              Iphone <span style={{ color: "white" }}>15 Series</span>
            </h5>
            <img src="assets/images/iphones.svg" alt="" />
          </div>
          <div className="left-2">
            <div className="boxes">
              <div className="box">
                <span>8</span>
                <span>Days</span>
              </div>
              <div className="box">
                <span>8</span>
                <span>Days</span>
              </div>
              <div className="box">
                <span>8</span>
                <span>Days</span>
              </div>
              <div className="box">
                <span>8</span>
                <span>Days</span>
              </div>
            </div>
            <p className="para">It feels good to be the first</p>
            <p>
              Get ready for the future of smartphones. Experience innovation
              like never before. Stay tuned for the big iPhone 15 pre-sale.
            </p>

            <button
              style={{ width: "130px", margin: "auto" }}
              className="btn btn-primary"
            >
              Register Now
            </button>
          </div>
        </div>

        <div className="right-side">
          <div className="right-1">
            <h3>Play Station 5</h3>
            <img
              className="playstation"
              src="assets/images/ps53.svg"
              alt=""
            />

            <p className="banner2-text">Digital Edition + 2TB</p>

            <button className="btn btn-primary banner2-btn">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="product-header">
        <h2>Best Sellers</h2>
        <Link className="view-all view-black" to="/products">
          View all ›
        </Link>
      </div>
      <hr />
      <div className="all-products best-sellers">
      {productStore.sellers.slice(0,4).map((data)=>{
         return   <ProductCard key={data.id} product={data} setShowLoginModal={setShowLoginModal}/>
        
        })}
      </div>

      <div className="product-header">
        <h2>Top Brands</h2>
      </div>
      <hr />

      <div className="top-brands">
        <img src="assets/images/top brands.svg" alt="" />
      </div>

      <div className="smart-watch">
        <img
          className="ellipse"
          src="assets/images/Ellipse-orange.svg"
          alt=""
        />
        <div className="watch-text">
          <h1>SMART WATCH</h1>
          <p>Various designs and brands</p>
          <button className="orange-btn">View</button>
        </div>
        <img className="watch-pair" src="assets/images/watches.svg" alt="" />
      </div>

      <div className="product-header">
        <h2>Our Blogs</h2>
        <Link className="view-all view-black" to="">
          View all ›
        </Link>
      </div>
      <hr />
      <div className="blog-section">
        <div className="blog-section-1">
          <img src="assets/images/blog-img1.svg" alt="" />
          <div className="blog-section-text">
            <div className="time">
              <span>
                <img src="assets/images/calendar.svg" alt="" /> August , 8 ,
                2023
              </span>
              <span>
                <img src="assets/images/timer.svg" alt="" /> 3 min read
              </span>
            </div>
            <h5 className="title">
              Meta Platforms plans to release free software that...
            </h5>
            <p className="description">
              The parent company of Facebook, Meta Platforms, is introducing
              software to help developers
            </p>
          </div>
        </div>
        <div className="blog-section-2">
          <div className="blog-card1">
            <div className="col-4">
              <img src="assets/images/blog image2.svg" alt="" />
            </div>
            <div className="blog-section-text col-8">
              <h6 className="title">
                Meta Platforms plans to release free software that...
              </h6>
              <p className="description2">
                The parent company of Facebook, Meta Platforms, is introducing
                software to help developers
              </p>
              <div className="time">
                <span>
                  <img src="assets/images/calendar.svg" alt="" /> August , 8 ,
                  2023
                </span>
                <img className="save" src="assets/images/save.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="blog-card1">
            <div className="col-4">
              <img src="assets/images/blog image3.svg" alt="" />
            </div>
            <div className="blog-section-text col-8">
              <h6 className="title">
                Meta Platforms plans to release free software that...
              </h6>
              <p className="description2">
                The parent company of Facebook, Meta Platforms, is introducing
                software to help developers
              </p>
              <div className="time">
                <span>
                  <img src="assets/images/calendar.svg" alt="" /> August , 8 ,
                  2023
                </span>
                <img className="save" src="assets/images/save.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
)

export default Index