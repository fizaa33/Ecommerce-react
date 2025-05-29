import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../components/sidebar';
import '../layout.css';
import '../media.css';
import WishCard from '../../components/wishlist-card';
import { rootStore } from '../../stores';

const Wishlist = observer((setShowLoginModal) => {
  const wishlistStore = rootStore.wishlistStore;

  useEffect(() => {
    wishlistStore.getWishlist();
  }, [wishlistStore]);

  return (
    <div className='container'>
      <br />
      <p className="gray-text">
        Home › <span className="blue-text">Wishlist</span>
      </p>
      <div className="account-container">
        <Sidebar />
        <div className="account-main">
          <h4>Wish list</h4>
          <p className="gray-text">See your favorites list here</p>

          <div className="wishlist-container all-products">
            {wishlistStore.wishlist.length > 0 ? (
              wishlistStore.wishlist.map((data, index) => (
                <WishCard key={data.productId || index} data={data} setShowLoginModal={setShowLoginModal} />
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Wishlist;
