import { Product } from "./product";

export class CartItem {
    public quantity: number = 0;
    public product!: Product;
}