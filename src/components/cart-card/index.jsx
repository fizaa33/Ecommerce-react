import { observer } from 'mobx-react-lite'
import React from 'react'
import { rootStore } from '../../stores'

const CartCard = observer(({item})=>{
    const cartStore = rootStore.cartStore;
function handleDeleteCart(){
    cartStore.deleteCart(item.id);
}
function increase() {
    const newQuantity = item.quantity + 1; 
    const data = {
        cartId: item.id,
        quantity: newQuantity
    };
    cartStore.updateCartItem(data);
}

function decrease() {
    if (item.quantity > 1) {  
        const newQuantity = item.quantity - 1;
        const data = {
            cartId: item.id,
            quantity: newQuantity
        };
        cartStore.updateCartItem(data);
    } else {
        alert("Minimum quantity is 1");
    }
}

  return (
    <div  className='div1 mt-3'> 
    <div className="cartItem-img">
            <img className="cart-drop-img" src={`https://ecomerceapis.runasp.net/${item.productImages[0]}`} alt="${item.productName}" />
        </div>
        <div className="div1-1">
            <h5>{item.productName || "Product Name"}</h5>
            <div className="m-circle">
                        <div className="circle"></div>
                        <span>Color: ${item.productColor || 'Default'}</span>
                    </div>
            <div className="pricedetail">
                <div className="addprice">
                    <span className="linethrough">$ {item.price || 0}</span>
                    <span>$ {item.totalPrice || 0}</span>
                </div>
                <div className="deleteprice">
                    <img onClick={handleDeleteCart} src="./assets/images/trash btn.svg" alt="Remove Item" className="delete-btn"  />
                    <div className="underline">
                        <button onClick={decrease} className="btn decrease-quantity" >-</button>
                        <span className="item-quantity">{item.quantity}</span>
                        <button onClick={increase} className="btn increase-quantity">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
})
export default CartCard
