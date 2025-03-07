import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  public products!: Product[];

  constructor(private productService: ProductService, private sharingDataService: SharingDataService) {}

  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

  onAddCart(product: Product): void {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
