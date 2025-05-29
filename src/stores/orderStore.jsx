import { makeAutoObservable } from "mobx";
import { callAPI, showToast } from "../utills/common";

class OrderStore {
    rootStore;
    error = null;
    loading = false;
    discountedPrice = null;
    orderStatus = [];
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async ApplyCoupon({coupon, requestData}){
      this.loading = true;
        const res = await callAPI(`Order/CheckOut?coupon=${coupon}`, "POST", requestData);
        let resData = await res.json();
        if(res.ok){
            showToast("coupon applied successfully", true)
            console.log(resData.data)
            this.discountedPrice = resData.data.totalAmount;
        }
        else{
            showToast("Failed to apply coupon", false)
        }
      this.loading = false;

    }
    async CreateOrder({coupon, data}){
      this.loading = true;
      let res = await callAPI(`Order/CreateOrder?coupon=${coupon}`, "POST", data);
      let resOrder = await res.json();

      if (res.ok) {
          showToast(resOrder.message, true);
         return resOrder;
        
      } else {
          showToast("Failed to create order", false);
      }
      this.loading = false;
    }

    async OrderStatus(id){
      let res = await callAPI(`Order/GetOrderById/${id}`);
      let resData =await res.json();
      this.orderStatus = resData.data;
     
    }

   
}

export default OrderStore;