import { makeAutoObservable } from "mobx";
import { callAPI, showToast } from "../utills/common";

class CartStore {
rootStore;
cart =[];
loading = false;
constructor(rootStore){
    this.rootStore = rootStore;
    makeAutoObservable(this);
}

    async addToCart(productId){
        this.loading = true;
        let data ={
            productId: productId,
            quantity: 1,
            couponId: 0,
        }
        let res = await callAPI(`Cart/AddToCart`, "POST", data);
              let resData = await res.json();
        if(res.ok){
            showToast('item added to cart', true);
        }
        else {
            showToast('item is already in cart', false);
        }
        this.loading = false;
    }

    async getUserCart(){
        let res = await callAPI(`Cart/GetUserCart`, "GET");
        let resData = await res.json();
        this.cart = resData.data;
    }

    async deleteCart(productId) {
        if (confirm("Are you sure you want to delete this item from your cart?")) {
            let res = await callAPI(`Cart/DeleteCartItem/${productId}`, "DELETE");
            if (res.ok) {
                showToast("Cart item deleted successfully", true);
                this.getUserCart();
            } else {
                showToast("Failed to delete cart item", false);
            }
        }
    }
    
    async updateCartItem(data){
      
        let res = await callAPI(`Cart/UpdateCartItems`, "PUT", data);
        if(res.ok){
            this.getUserCart();
        }
    }
  
}

export default CartStore;