import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input() public items: CartItem[] = [];
  @Input() public total: number = 0;
  @Output() public idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }
}
