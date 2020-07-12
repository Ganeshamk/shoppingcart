import { NgModule } from '@angular/core';
import { EllipsisPipePipe } from './ellipsis-pipe.pipe';
import { OrderByPipe } from './order-by.pipe';

export const PIPES = [
    EllipsisPipePipe,
    OrderByPipe
];
@NgModule({
    declarations: PIPES,
    exports: PIPES
})

export class PipesModule { }
