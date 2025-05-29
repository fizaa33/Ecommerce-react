import { makeAutoObservable } from "mobx";
import { callAPI, callAPIFormData, showToast } from "../utills/common";

class WishlistStore {
rootStore;
wishlist =[];
constructor(rootStore){
    this.rootStore = rootStore;
    makeAutoObservable(this);
}

    async addToWishlist(productId){
        let data ={
            productId: productId,
            quantity: 1,
            couponId: 0,
        }
        let res = await callAPI(`WishList/AddWishList`, "POST", data);
        let resData = await res.json();
        if(res.ok){
            showToast('item added to wishlist', true);
        }
        else {
            showToast('item is already in wishlist', false);
        }
    }

    async getWishlist(){
        let res = await callAPI(`WishList/GetUserWishList`, "GET");
        let resData = await res.json();
        if(res.ok){
            this.wishlist = resData.data;
                }
    }

    async deleteWishItem(id) {
        if (confirm("Are you sure you want to delete item from wishlist?")) {
            let res = await callAPI(`WishList/DeleteWishListItem/${id}`, "DELETE");
            if (res.ok) {
                this.getWishlist();
            }
        }
    }
    
}




export default WishlistStore;