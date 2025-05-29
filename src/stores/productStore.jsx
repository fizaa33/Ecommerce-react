import { makeAutoObservable } from "mobx";
import { callAPI } from "../utills/common";

class ProductStore {
    rootStore;
    error = null;
    loading = false;
    products = [];
    sellers =[];
    discounted = [];
    mostSearch =[];
    searchedProduct = [];
    categoryProduct = [];
    singleProduct = null;
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async ShowProducts(){
        let res = await callAPI(`Product/GetProductsWithPaging?pageNumber=1&pageSize=100`);
        let resData = await res.json();
        this.products = resData.data;
    }
    async ShowBestSellers(){
        let res = await callAPI(`Product/GetBestSellerProduct`);
        let resData = await res.json();
        this.sellers = resData.data;
    }
    async ShowProductDetail(productId){
      
        let res = await callAPI(`Product/GetProductById?productId=${productId}`);
        let resData = await res.json();
        console.log(resData.data);
        this.singleProduct = resData.data;
        
    }
    async ShowDiscountedProduct(){
        let res = await callAPI(`Coupon/GetRandomCouponProducts`);
        let resData = await res.json();
        this.discounted = resData.data;
    }

    async showMostSearchedItems(){
        let res = await callAPI(`Product/GetSearchedItem`);
        let resData = await res.json();
        this.mostSearch = resData.data;
    }

    async getSearchedProducts(query){
        let res = await callAPI(`Product/SearchProductsByName?query=${query}`);
        let resData = await res.json();
        this.searchedProduct = resData.data;
    }

    async getProductByCategory({categoryId, value}){
        let res = await callAPI(`Product/GetProductsByCategory/${categoryId}?childProducts=${value}`);
        let resData = await res.json();
        this.categoryProduct = resData.data;
      
    }
}

export default ProductStore;
