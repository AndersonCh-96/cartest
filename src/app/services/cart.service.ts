import { Product } from './../interfaces/product';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<Product[]>([]);

  constructor() {}

  addToCart(product: Product) {
    this.items.update((d: any) => [...d, product]);
  }

  getItems() {
    return this.items();
  }

  total() {
    if (!this.items()) return;
    let total = 0;
    this.items().forEach((a) => (total += a.price));
    return total;
  }

  deleteItem(item: any) {
    if (!this.items()) return;
    this.items.update((a) => a.filter((a, index) => item !== index));
  }
}
