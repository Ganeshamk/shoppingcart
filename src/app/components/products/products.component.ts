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

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  onClickedOutside(event: any) {
    this.isDispalyCategories = false;
  }

  filterBtn() {
    this.isDispalyCategories = !this.isDispalyCategories;
  }

  clearSearchText() {
    this.searchText = '';
    this.searchTextChange(this.searchText);
  }

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

  get isApplyFilter() {
    return this.categories.findIndex(category => {
      return category.status;
    }) < 0 ? false : true;
  }

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

  addToCart(product: any, index: number) {
    this.productsData[index].quantity = 1;
    this.cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  changeQuantity(product: any, status: any, index: number) {
    let cartDataIndex = this.cartItems.findIndex(data => {
      return data.productId === product.productId;
    });
    if (status === 'dec') {
      this.productsData[index].quantity -= 1;
      if (this.productsData[index].quantity === 0) {
        this.cartItems.splice(cartDataIndex, 1);
      } else {
        this.cartItems[cartDataIndex].quantity = this.productsData[index].quantity;
      }
    } else {
      this.productsData[index].quantity += 1;
      this.cartItems[cartDataIndex].quantity = this.productsData[index].quantity;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  gotoProductDetails(product: any) {
    this.router.navigate(['productDetails', product.productId]);
  }
}
