import { CartItem } from '../models/cart-item';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { Product } from '../models/product';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {
  public items: CartItem[] = [];
  public total: number = 0;

  constructor(private router: Router, private sharingDataService: SharingDataService) {}

  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  ngOnInit(): void {
    this.retrieveSession();
    this.onAddCart();
    this.onDeleteCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product: Product) => {
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
      this.saveSession();
      this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });
      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto agregado al carro!",
        icon: "success",
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id: number) => {
      Swal.fire({
        title: "Está seguro que desea eliminar?",
        text: "Cuidado el item se eliminará del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.items = this.items.filter((item) => item.product.id !== id);
          this.saveSession();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], { state: { items: this.items, total: this.total } });
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras.",
            icon: "success"
          });
        }
      });
    });
  }

  retrieveSession(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
    this.calculateTotal();
  }
}
