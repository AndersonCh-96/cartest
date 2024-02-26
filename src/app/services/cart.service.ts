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

  getTotal() {
    return this.items().reduce((acum, item) => {
      return acum + item.price * item.cantidad;
    }, 0);
  }

  deleteItem(item: any) {
    if (!this.items()) return;
    this.items.update((a) => a.filter((a, index) => item !== index));
  }

  increment(id: number) {
    this.items.update((a) =>
      a.map((a, index) => {
        if (id === index) {
          return { ...a, cantidad: a.cantidad + 1 };
        }
        return a;
      })
    );
  }
  decrement(id: number) {
    this.items.update((a) =>
      a.map((a, index) => {
        if (id === index) {
          if (a.cantidad > 1) {
            return { ...a, cantidad: a.cantidad - 1 };
          }
        }
        return a;
      })
    );
  }
}
