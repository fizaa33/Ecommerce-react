import { makeAutoObservable } from "mobx";
import { callAPI } from "../utills/common";

class CategoryStore {
    rootStore;
    error = null;
    category = [];
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async ShowCategory(){
        let res = await callAPI(`Category/GetAllCategories`);
        let resData = await res.json();
        this.category = resData.data;
    }
}

export default CategoryStore;