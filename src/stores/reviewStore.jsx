import { makeAutoObservable } from "mobx";
import { callAPI, showToast } from "../utills/common";

class ReviewStore {
    rootStore;
    error = null;
    loading = false;
    reviews = [];
    banner = [];
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    
    async addReview(data){
        this.loading = true;
        let res = await callAPI(`Review/AddReview`, "POST", data);
       
        if(res.ok){
            showToast("review added successfully", true)
        }
        else{
            showToast("failed to add review", false)
        }
        this.loading = false;
    }

    async getReviews(id){
        let res = await callAPI(`Review/GetReviews/${id}`, "GET");
        let resData = await res.json();
        this.reviews = resData.data;

    }

       
    
}

export default ReviewStore;