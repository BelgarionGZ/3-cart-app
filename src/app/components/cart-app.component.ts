import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cart-item';
import { CatalogComponent } from './catalog/catalog.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'cart-app',
  imports: [CartComponent, CatalogComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {
  public items: CartItem[] = [];
  public products: Product[] = [];
  public showCart: boolean = false;
  public total: number = 0;

  constructor(private service: ProductService) {}

  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.retrieveSession();
  }

  onAddCart(product: Product): void {
    const hasItem = this.items.find((item) => item.product.id === product.id);
    if(hasItem) {
      this.items = this.items.map((item) => {
        if(item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    } else {
      this.items = [ ...this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter((item) => item.product.id !== id);
    this.calculateTotal();
    this.saveSession();
  }

  openCart(): void {
    this.showCart = !this.showCart;
  }

  retrieveSession(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
