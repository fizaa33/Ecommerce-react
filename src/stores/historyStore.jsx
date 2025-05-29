import { makeAutoObservable } from "mobx";
import { callAPI } from "../utills/common";

class HistoryStore {
    rootStore;
    error = null;
    history = [];
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async GetHistory(){
        let res = await callAPI("Order/GetOrders");

        let resData = await res.json();
        this.history = resData.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    }

        

       
}

export default HistoryStore;