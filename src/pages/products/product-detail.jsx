import React, { useEffect, useState } from 'react'
import '../layout.css'
import './product.css'
import './product-detail-media.css'
import { rootStore } from '../../stores'
import { useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Spinner } from 'react-bootstrap'

const ProductDetail = observer(()=>{
  const {id} = useParams();
  const productStore = rootStore.productStore;
const product = productStore.singleProduct;
const cartStore = rootStore.cartStore;
const reviewStore = rootStore.reviewStore;
const [review , setReview] = useState("");
const [rating, setRating] = useState(0);
  useEffect(()=>{
    productStore.ShowProductDetail(id);
    reviewStore.getReviews(id);
  }, [])
  if (!product) {
    return <div>Loading product details...</div>;
  }
  function addToCart(){
cartStore.addToCart(id);
  }
async function handleAddReview(){
  if (!review.trim()) {
    alert("Please enter a review message.");
    return;
  }

  if (rating < 1 || rating > 5) {
    alert("Please select a rating between 1 and 5.");
    return;
  }
  const data = {
    productId : id,
    message : review,
    points : rating,
  }
 await reviewStore.addReview(data);
 setRating(0);
 setReview("");

}
const handleStarClick = (value) => {
  setRating(value); 
};
  return (
    <div className="container">
    <br />
    <p className="gray-text">
      Home › Products › <span className="blue-text">Laptops</span>
    </p>

    <div className="laptop-container">
      <div className="detail-img">
        <img src={`https://ecomerceapis.runasp.net/${product.imagePath[0].imagePath}`} className="main-img" alt="" />
        <div className="detail-images">
         
        </div>
      </div>
      <div className="detail-text">
          <h5>{product.name}</h5>
          <div className="sold-rating">
              <span style={{background: '#063a88'}} className="badge p-2">
                  <i className="fa-solid fa-star"></i> 4.8
              </span>
              <span>sold 125</span>
          </div>
          <div className="stock">
              <span>
                  <img src="/assets/images/shop.svg" alt="" /> In Stock
              </span>
              <span>
                  <img src="/assets/images/guarantee.svg" alt="" /> Guaranteed
              </span>
              <span>
                  <img src="/assets/images/delivey.svg" alt="" /> Free Delivery
              </span>
          </div>
          <div className="color">
              <span>Select color</span>
              <i style={{color: '#717171'}} className="fa-solid fa-circle"></i>
              <i style={{color: '#353535'}} className="fa-solid fa-circle-check"></i>
          </div>
          <div className="product-price">
              <h5>$ {product.price}</h5>
              <p style={{color: "orangered"}}>
                  <img src="/assets/images/discount-shape.svg" alt="" />-12%
              </p>
          </div>
          <p className="last-price">last price $ 336.00</p>
          <div className="buy-now">
              <button className="btn btn-primary w-100">Buy Now</button>
              <button onClick={addToCart} className="btn btn-outline-primary w-100">{cartStore.loading? <Spinner animation="border" variant="light" /> : "Add to cart"}</button>
          </div>
      </div>
  </div>
  

    <nav className="border-bottom my-4" id="navbar-example">
      <ul className="nav  w-100">
        <li className="nav-item mx-4">
          <a href="#technical" className="nav-link active">Technical Details</a>
        </li>
        <li className="nav-item mx-4">
          <a href="#similar" className="nav-link">Similar Products</a>
        </li>
        <li className="nav-item mx-4">
          <a href="#comments" className="nav-link">Comments</a>
        </li>
      </ul>
    </nav>

    <section id="technical" className="section">
      <h5>Technical Details</h5>
      <div className="tech-detail-text">
        <ul className="detail-txt">
          <li>Display</li>
          <li>Graphics</li>
          <li>Processor</li>
          <li>In the box</li>
          <li>Height</li>
          <li>Width</li>
        </ul>
        <ul className="detail-txt">
          <li>13.3-inch (diagonal) LED-backlit display with IPS technology</li>
          <li>Apple 10-core GPU</li>
          <li>Apple M2 chip</li>
          <li>67W USB-C Power Adapter, USB-C Charge Cable (2 m)</li>
          <li>0.61 inch (1.56 cm)</li>
          <li>11.97 inches (30.41 cm)</li>
        </ul>
      </div>
    </section>

    <section id="similar" className="section">
      <h5>Similar Products</h5>
      <div className="all-products">
       </div>
    </section>

    <section id="comments" className="section">
      <h5>Comments</h5>
      <div className="comment-section">
        <div className="enter-comment">
          <p>leave your comments here for other customers</p>
          <textarea value={review} onChange={e => setReview(e.target.value)} type="text" className="form-control" placeholder="Share your thoughts about this product here"></textarea>
          <div className="by-features mt-4">
        <h6>Product Rating</h6>
        
        <div className="stars">
          {/* Loop through 5 stars and display them */}
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        
        <input 
          className="review-rating" 
          type="number" 
          min="0" 
          max="5" 
          value={rating} 
          readOnly
        />
      </div>
          <button onClick={handleAddReview} className="btn btn-outline-primary w-100 my-3">{reviewStore.loading? <Spinner animation="border" variant="light" /> : "Comment"}</button>
       

        </div>
        <div className="all-comments">
          {
            reviewStore.reviews.map((review)=>{
              return (
<div key={review.id} className="comment1">
                    <div className="comment-profile">
                        <img src="/assets/images/person.svg" alt="" />
                        <div className="profile-name">
                            <h6>{review.username || "Anonymous"}</h6>
                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span  style={{ background: '#063a88', marginLeft: 'auto' }}  className="badge">
                            <i className="fa-solid fa-star"></i> {review.points.toFixed(1)}
                        </span>
                    </div>
                    <p className="comment-text">{review.message}</p>
                    <div className="thumbs">
                        <img src="/assets/images/thumb-up.svg" alt="" />
                        <span>{review.likes || 0}</span>
                        <span>|</span>
                        <img src="/assets/images/thumb-down.svg" alt="" />
                        <span>{review.dislikes || 0}</span>
                    </div>
                </div>
              )
            })
          }        
        </div>
      </div>
    </section>
  </div>
  )
})
export default ProductDetail
