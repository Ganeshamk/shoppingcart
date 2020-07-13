import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  cartItems: any[] = [];
  productsData: any = [];
  products: any = [];
  categories: any[] = [];
  isDispalyCategories: boolean = false;
  searchText: any;
  isSort: boolean = true;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  /* hide categories by clicking outside the categories block */
  onClickedOutside(event: any) {
    this.isDispalyCategories = false;
  }

  /* toggle categories */
  filterBtn() {
    this.isDispalyCategories = !this.isDispalyCategories;
  }

  /* clear search text */
  clearSearchText() {
    this.searchText = '';
    this.searchTextChange(this.searchText);
  }

  /* filter products by product name */
  searchTextChange(event: any) {
    if (event) {
      this.products = this.productsData.filter(product => {
        if (product.name.toLowerCase().includes(event.toLowerCase())) {
          if (this.isApplyFilter) {
            if (this.categories.findIndex(category => {
              return (category.name.toLowerCase() === product.category.toLowerCase() && category.status);
            }) > -1) {
              return product;
            }
          } else {
            return product;
          }
        }
      });
    } else {
      this.applyFilter();
    }
  }

  /* checking filter applied or not */
  get isApplyFilter() {
    return this.categories.findIndex(category => {
      return category.status;
    }) < 0 ? false : true;
  }

  /* filter products by category */
  applyFilter() {
    this.searchText = '';
    if (this.isApplyFilter) {
      this.products = [];
      this.products = this.productsData.filter(product => {
        if (this.categories.findIndex(category => {
          return (category.name.toLowerCase() === product.category.toLowerCase() && category.status);
        }) > -1) {
          return product;
        }
      });
    } else {
      this.products = this.productsData;
    }
  }

  /* get all products list  */
  getProducts() {
    this.productService.getProducts().then(productsData => {
      this.productsData = productsData;
      this.productsData.forEach(product => {
        if (product) {
          if (this.categories.findIndex(category => category.name === product.category) < 0) {
            this.categories.push({
              name: product.category,
              status: false
            });
          }
        }
      });
      this.products = this.productsData;
      this.getcartItems();
    });
  }

  /* get cart items details  */
  getcartItems() {
    this.productService.getCartItems$.subscribe((cartItems: any) => {
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
          if (item) {
            let index = this.products.findIndex(data => {
              return data.productId === item.productId;
            });

            if (index >= 0) {
              this.products[index].quantity = item.quantity;
            }
          }
        });
        this.cartItems = cartItems;
      } else {
        this.products.forEach(product => {
          if (product) {
            product.quantity = 0;
          }
        });
      }
    });
  }

  /* Add to cart  */
  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  /* change product quantity */
  changeQuantity(product: any, status: any) {
    this.productService.changeQuantity(product, status);
  }

  /* goto product details page  */
  gotoProductDetails(product: any) {
    this.router.navigate(['productDetails', product.productId]);
  }
}
