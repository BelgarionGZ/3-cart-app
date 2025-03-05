import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() public items: CartItem[] = [];
  @Output() public showCartEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  openCart(): void {
    this.showCartEventEmitter.emit();
  }
}
