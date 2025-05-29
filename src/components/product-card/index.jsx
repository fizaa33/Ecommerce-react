import React from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { rootStore } from '../../stores'
import { Link } from 'react-router'

const ProductCard = observer(({ product, setShowLoginModal }) => {
  const isLoggedIn = localStorage.getItem("token");
  const wishlistStore = rootStore.wishlistStore;
  const cartStore = rootStore.cartStore;
  function addWishlist(event) {
    event.stopPropagation();
    console.log('Heart icon clicked');

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    else {
      wishlistStore.addToWishlist(product.id);
    }
  }

  function addCart(event) {
    event.stopPropagation();
    console.log('cart icon clicked');

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    else {
      cartStore.addToCart(product.id);
    }
  }

  return (
    <div className="product-card">
      <img onClick={addWishlist} className="heart addWishlist" src="assets/images/heart.svg" alt="" />
      <img onClick={addCart} style={{ top: '50px' }} className="heart addCart" src="assets/images/delete.svg" alt="" />
      <Link to={`/product/${product.id}`}>
        <div className="image-div">
          <img className="product-img" src={`https://ecomerceapis.runasp.net/${product.imagePath[0]}`} alt={product.name} />
        </div>
      </Link>
      <img className="product-stroke" src="assets/images/stroke.svg" alt="" />
      <p><Link to="/product/detail">{product.name}</Link></p>
      <div className="price">
        <span>${product.price}</span>
        <span className="rating"><FontAwesomeIcon icon={faStar} /> 4.5</span>
      </div>
    </div>
  )
})
export default ProductCard;
