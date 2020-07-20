import { Component, OnInit, ViewChild, ElementRef, HostListener, HostBinding, NgZone } from '@angular/core';
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
  position: number = 0;
  @ViewChild('container', { static: true }) container: ElementRef;
  parentWidth: any;
  childrenWidth: any;

  constructor(private productService: ProductService,
    private ngZone: NgZone,
    private router: Router) { }

  ngOnInit() {
    this.getProducts();
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.resizeWorks();
      });
    };
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
  changeQuantity(product: any, status: any, index: any) {
    if (status === 'inc') {
      this.products[index].quantity += 1;
    } else {
      this.products[index].quantity -= 1;
    }
    this.productService.changeQuantity(product, status);
  }

  /* goto product details page  */
  gotoProductDetails(product: any) {
    this.router.navigate(['productDetails', product.productId]);
  }

  next() {
    this.parentWidth = this.container.nativeElement.offsetWidth;
    this.childrenWidth = this.container.nativeElement.children[0].offsetWidth;
    if (this.parentWidth !== (this.products.length * this.childrenWidth)) {
      if (this.position <= -((this.products.length * this.childrenWidth) - this.parentWidth)) {
        this.position = 0;
      } else {
        this.position -= this.childrenWidth;
      }
    }
  }

  prev() {
    this.parentWidth = this.container.nativeElement.offsetWidth;
    this.childrenWidth = this.container.nativeElement.children[0].offsetWidth;
    if (this.parentWidth !== ((this.products.length * this.childrenWidth) - this.parentWidth)) {
      if (this.position >= 0) {
        this.position = -((this.products.length * this.childrenWidth) - this.parentWidth);
      } else {
        this.position += this.childrenWidth;
      }
    }
  }

  private resizeWorks(): void {
    this.parentWidth = this.container.nativeElement.offsetWidth;
    this.childrenWidth = this.container.nativeElement.children[0].offsetWidth;
  }
}
