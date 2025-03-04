import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'div[product-card]',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() public product!: Product;
  @Output() public productEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product): void {
    this.productEventEmitter.emit(product);
  }
}
