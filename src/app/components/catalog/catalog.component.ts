import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  @Input() public products!: Product[];
  @Output() public productEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product): void {
    this.productEventEmitter.emit(product);
  }
}
