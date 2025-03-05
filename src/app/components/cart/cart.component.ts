import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges {
  public total: number = 0;
  @Input() public items: CartItem[] = [];
  @Output() public idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
