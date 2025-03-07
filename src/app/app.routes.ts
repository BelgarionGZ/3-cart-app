import { CartComponent } from './components/cart/cart.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/catalog', pathMatch: 'full' },
    { path: 'cart', component: CartComponent },
    { path: 'catalog', component: CatalogComponent },
];
