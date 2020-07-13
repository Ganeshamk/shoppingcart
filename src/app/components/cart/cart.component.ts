import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getCartData();
  }

  /* get all cart data */
  getCartData() {
    this.productService.getCartItems$.subscribe((cartItems: any) => {
      if (cartItems && cartItems.length > 0) {
        this.cartItems = cartItems;
        this.getTotalAmount();
      } else {
        this.cartItems = [];
      }
    });
  }

  /* change product quantity */
  changeQuantity(item: any, status: any, index: number) {
    this.productService.changeQuantity(item, status);
  }

  /* remove cart item */
  removeItem(index) {
    this.productService.removeCartItem(index);
  }

  /* calculate total amount */
  getTotalAmount() {
    if (this.cartItems) {
      this.totalAmount = 0;
      this.cartItems.forEach(item => {
        if (item) {
          this.totalAmount += (item.quantity * item.price);
        }
      });
    } else {
      this.totalAmount = 0;
    }
  }
}
