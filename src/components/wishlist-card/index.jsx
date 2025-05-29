import React from 'react'
import { rootStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';

const WishCard = observer(({data, setShowLoginModal})=>{
  const isLoggedIn = localStorage.getItem("token");
  const cartStore = rootStore.cartStore;
  const wishlistStore = rootStore.wishlistStore;
  function addCart(event){
    event.stopPropagation(); 
    console.log('cart icon clicked'); 

    if(!isLoggedIn){
      setShowLoginModal(true);
      return;
    }
    else{
      cartStore.addToCart(data.productId);
    }
  }
  function deleteItem(event){
    event.stopPropagation(); 
   console.log("delete icon clicked");
    wishlistStore.deleteWishItem(data.id);
   
  }
  return (
    <div className='product-card'>
          <Link to={`/product/${data.id}`}>
            <div className="image-div">
              <img className="product-img" src={`https://ecomerceapis.runasp.net/${data.productImages[0]}`}alt= {data.productName} />
              </div>
            </Link>
            <p>
              <Link to={`/product/${data.id}`}>
            {data.productName}
              </Link>
            </p>
            <div className="price">
              <button onClick={addCart} className="btn btn-outline-primary addCart">Add to Cart</button>
              <img onClick={deleteItem} src="assets/images/trash btn.svg" alt="Delete Item" className="delete-btn"  />
            </div>
    </div>
  )
})

export default WishCard
