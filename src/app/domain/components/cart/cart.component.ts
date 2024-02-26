import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  list = inject(CartService);

  deleteItem(id: number) {
    return this.list.deleteItem(id);
  }

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.list.items()));
    });
  }
  ngOnInit() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.list.items.set(JSON.parse(data));
    }
  }

  increment(id: number) {
    this.list.increment(id);
  }
  decrement(id: number) {
    this.list.decrement(id);
  }
}
