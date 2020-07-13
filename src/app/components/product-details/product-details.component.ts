import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  productDetails: any;
  cartItems = [];

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      if (data) {
        this.getProductDetails(data.id);
      }
    });
  }

  /* get product details by product id */
  getProductDetails(productId: any) {
    this.productService.getProductDetailsById(productId).then(product => {
      if (product) {
        this.productDetails = product;
        this.productService.getCartItems$.subscribe((cartData: any) => {
          if (cartData.length > 0) {
            this.cartItems = cartData;
            let index = this.findIndex();
            this.productDetails.quantity = this.cartItems[index].quantity;
          } else {
            this.productDetails.quantity = 0;
          }
        });
      }
    });
  }

  /* Add to cart  */
  addToCart() {
    this.productService.addToCart(this.productDetails);
  }

  /* find product position in the cart data  */
  findIndex() {
    return this.cartItems.findIndex(data => {
      return data.productId === this.productDetails.productId;
    });
  }

  /* change product quantity */
  changeQuantity(status: any) {
    this.productService.changeQuantity(this.productDetails, status);
  }
}
