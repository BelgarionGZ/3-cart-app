import { CartItem } from '../../models/cart-item';
import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public items: CartItem[] = [];
  public total: number = 0;

  constructor(private router: Router, private sharingDataService: SharingDataService) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id: number): void {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
