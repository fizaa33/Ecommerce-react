import ProductStore from "./productStore";
import AuthStore from "./authStore";
import WishlistStore from "./wishlistStore";
import CartStore from "./cartStore";
import CategoryStore from "./categoryStore";
import AddressStore from "./addressStore";
import OrderStore from "./orderStore";
import HistoryStore from "./historyStore";
import ReviewStore from "./reviewStore";
class RootStore{
    constructor(){
        this.productStore = new ProductStore(this);
        this.authStore = new AuthStore(this);
        this.wishlistStore = new WishlistStore(this);
        this.cartStore = new CartStore(this);
        this.categoryStore = new CategoryStore(this);
        this.addressStore = new AddressStore(this);
        this.orderStore = new OrderStore(this);
        this.historyStore = new HistoryStore(this);
        this.reviewStore = new ReviewStore(this);
    }
}

export const rootStore = new RootStore(); 