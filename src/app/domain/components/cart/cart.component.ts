import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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

  increment(id: number) {
  
    this.list.increment(id);
  }
  decrement(id: number) {
    this.list.decrement(id);
  }
}
