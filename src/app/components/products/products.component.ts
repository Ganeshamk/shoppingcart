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
      this.getcartItems();
    });
  }

  /* get cart items details  */
  getcartItems() {
    this.productService.getCartItems().then((cartItems: any) => {
      if (cartItems) {
        cartItems.forEach(item => {
          if (item) {
            let index = this.productsData.findIndex(data => {
              return data.productId === item.productId;
            });

            if (index >= 0) {
              this.productsData[index].quantity = item.quantity;
            }
          }
        });
        this.cartItems = cartItems;
      }
      this.products = this.productsData;
    });
  }

  /* Add to cart  */
  addToCart(product: any, index: number) {
    this.products[index].quantity = 1;
    this.cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  /* change product quantity */
  changeQuantity(product: any, status: any, index: number) {
    let cartDataIndex = this.cartItems.findIndex(data => {
      return data.productId === product.productId;
    });
    if (status === 'dec') {
      this.products[index].quantity -= 1;
      if (this.products[index].quantity === 0) {
        this.cartItems.splice(cartDataIndex, 1);
      } else {
        this.cartItems[cartDataIndex].quantity = this.products[index].quantity;
      }
    } else {
      this.products[index].quantity += 1;
      this.cartItems[cartDataIndex].quantity = this.products[index].quantity;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  /* goto product details page  */
  gotoProductDetails(product: any) {
    this.router.navigate(['productDetails', product.productId]);
  }
}
