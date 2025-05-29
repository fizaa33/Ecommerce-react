import { makeAutoObservable } from "mobx";
import { callAPI, showToast } from "../utills/common";

class AuthStore {
    rootStore;
    error = null;
    loading = false;
    isLoggedIn = false;
    profile = [];
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async signup(data){
        this.loading = true;
        let res = await callAPI("Users/Signup", "POST", data);
        let resData = await res.json();
        if(res.ok){
            showToast(resData.message, true)
        }
        else{
            showToast(resData.message, false)

        }
        this.loading = false
    }
    async login(data){
        this.loading = true;
        let res = await callAPI("Users/Login", "POST", data);
        let resData = await res.json();
        if(res.ok){
            localStorage.setItem("token", resData.data);
            this.isLoggedIn = true;
            showToast(resData.message, true)

        }
        else{
            showToast(resData.message, false)

        }
        this.loading = false

    }

    logout(){
        localStorage.removeItem("token");
    }
    async UserProfile(){
        let res = await callAPI("Users/UserProfile" , 'POST');
        let resData = await res.json();
        this.profile = resData.data;
    }
}

export default AuthStore;