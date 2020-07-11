import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [
    {
      productId: 'INF001',
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
      "name": "CHECK PRINT SHIRT",
      "price": 110,
      category: 'cloths',
      quantity: 0
    },
    {
      productId: 'INF002',
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
      "name": "GLORIA HIGH LOGO SNEAKER",
      "price": 91,
      category: 'shoes',
      quantity: 0
    },
    {
      productId: 'INF003',
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
      "name": "CATE RIGID BAG",
      "price": 94.5,
      category: 'Bags',
      quantity: 0
    },
    {
      productId: 'INF004',
      "imgUrl": "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
      "name": "GUESS CONNECT WATCH",
      "price": 438.9,
      category: 'watches',
      quantity: 0
    },
    {
      productId: 'INF005',
      "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
      "name": "70s RETRO GLAM KEFIAH",
      "price": 20,
      category: 'cloths',
      quantity: 0
    },
    {
      productId: 'INF007',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/FM7GENFAL12-BROCR-ALT1",
      "name": "GENOVA 4G LOGO RUNNING SHOE",
      "price": 99,
      category: 'shoes',
      quantity: 0
    },
    {
      productId: 'INF008',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/HMDNPUP0324-BLA",
      "name": "DAN LA CROSSBODY",
      "price": 94.5,
      category: 'Bags',
      quantity: 0
    },
    {
      productId: 'INF009',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/GW0051FMSWC-G3",
      "name": "MULTIFUNCTION WATCH",
      "price": 199,
      category: 'watches',
      quantity: 0
    },
    {
      productId: 'INF012',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/FM6GENLEA12-WHITE-ALT1",
      "name": "GENOVA REAL LEATHER RUNNING SHOE",
      "price": 94,
      category: 'shoes',
      quantity: 0
    },
    {
      productId: 'INF013',
      name: 'DAN 4G LOGO PRINT MINI CROSSBODY',
      "imgUrl": "https://img.guess.com/image/upload/w_546,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/HMDNLJP0224-BRO",
      "price": 94.5,
      category: 'Bags',
      quantity: 0
    },
    {
      productId: 'INF014',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/WW1256FMSWC-G1",
      "name": "MULTI-FUNCTION STITCH DETAIL WATCH",
      "price": 159,
      category: 'watches',
      quantity: 0
    },
    {
      productId: 'INF017',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/FM7GENELE12-WHITE",
      "name": "GENOVA LOGO SCRIPT RUNNING SHOE",
      "price": 69,
      category: 'shoes',
      quantity: 0
    },
    {
      productId: 'INF018',
      "imgUrl": "https://img.guess.com/image/upload/w_430,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/HM6837PL201-BLA",
      "name": "DAN LOGO PANEL CROSSBODY",
      "price": 94.5,
      category: 'Bags',
      quantity: 0
    },
    {
      productId: 'INF019',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/WW0799FMSWC-G4",
      "name": "RHINESTONE CASE WATCH",
      "price": 439.9,
      category: 'watches',
      quantity: 0
    },
    {
      productId: 'INF022',
      "imgUrl": "https://img.guess.com/image/upload/w_938,c_scale/f_auto,q_auto/fl_strip_profile/e_sharpen:50,q_auto:low/v1//EU/Style/ECOMM/FM7SALELE12-BLACK",
      "name": "SALERNO STUD SNEAKER",
      "price": 119,
      category: 'shoes',
      quantity: 0
    }
  ];

  constructor() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  getProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    return new Promise(resolve => {
      resolve(products);
    });
  }

  getProductDetailsById(productId: any) {
    let products = JSON.parse(localStorage.getItem("products"));
    return new Promise(resolve => {
      let index = products.findIndex(product => {
        return product.productId === productId;
      });
      if (index >= 0) {
        resolve(products[index]);
      }
    });
  }

  getCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    return new Promise(resolve => {
      resolve(cartItems);
    });
  }
}
