import { makeAutoObservable } from "mobx";
import { callAPI, showToast } from "../utills/common";

class AddressStore {
    rootStore;
    error = null;
    loading = false;
    latestAddress = null;
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

        async addAddress(data){
            this.loading = true;
            let res = await callAPI("Address/AddAddress", "POST", data);
            let resData = await res.json();
            if(res.ok){
                showToast(resData.message, true)
            }
            else{
                showToast(resData.message, false)

            }
            this.loading = false;

        }

        async getAddress(){
            let res = await callAPI("Address/GetAddresss");
            let resData = await res.json();
         
            let addresses = resData.data;
        
            this.latestAddress = addresses[addresses.length - 1]; 
        }
    
}

export default AddressStore;