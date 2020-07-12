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
    this.productService.getCartItems().then((cartItems: any) => {
      if (cartItems) {
        this.cartItems = cartItems;
        this.getTotalAmount();
      }
    });
  }

  /* change product quantity */
  changeQuantity(item: any, status: any, index: number) {
    if (status === 'dec') {
      this.cartItems[index].quantity -= 1;
      if (this.cartItems[index].quantity === 0) {
        this.removeItem(index);
      }
    } else {
      this.cartItems[index].quantity += 1;
    }
    this.updateCartData();
  }

  /* remove cart item */
  removeItem(index) {
    this.cartItems.splice(index, 1);
    this.updateCartData();
  }

  /* update cart data */
  updateCartData() {
    this.getTotalAmount();
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
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
