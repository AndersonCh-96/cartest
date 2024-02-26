import { pipe } from 'rxjs';
import { Product } from './../interfaces/product';
import { Injectable, OnInit, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public items = signal<Product[]>([]);

  // constructor() {
  //   effect(() => {
  //     localStorage.setItem('cart', JSON.stringify(this.items()));
  //   });
  // }
  // ngOnInit() {
  //   const data = localStorage.getItem('cart');
  //   if (data) {
  //     this.items.set(JSON.parse(data));
  //   }
  // }

  addToCart(product: Product) {
    this.items.update((d: any) => [...d, product]);
    localStorage.setItem('cart', JSON.stringify(this.items()));
  }

  getItems() {
    return this.items();
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
