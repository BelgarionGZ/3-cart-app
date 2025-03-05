import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cart-item';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {
  @Input() public items: CartItem[] = [];
  @Output() public idProductEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output() public closeCartEventEmitter: EventEmitter<void> = new EventEmitter<void>();
  
  closeCart(): void {
    this.closeCartEventEmitter.emit();
  }

  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }
}
