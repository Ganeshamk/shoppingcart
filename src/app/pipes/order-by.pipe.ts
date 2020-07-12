import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], key: any, order: any): any {
    if (array) {
      return array.sort((a: any, b: any) => {
        if (order === 'asc') {
          if (a[key] < b[key]) {
            return -1;
          } else if (a[key] > b[key]) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a[key] > b[key]) {
            return -1;
          } else if (a[key] < b[key]) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }
  }
}
