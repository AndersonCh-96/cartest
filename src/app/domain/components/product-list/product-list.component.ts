import { CommonModule } from '@angular/common';
import { Product } from './../../../interfaces/product';
import { Component, inject, signal } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  public products = signal([
    {
      id: 1,
      name: 'Computador',
      price: 200,
    },
    {
      id: 2,
      name: 'Lavadora',
      price: 400,
    },
    {
      id: 3,
      name: 'Equipo',
      price: 130,
    },
  ]);
  addProduct = inject(CartService);

  addCart(product: any) {
    if (!product) return;
    return this.addProduct.addToCart(product);
  }
}
