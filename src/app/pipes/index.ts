import { NgModule } from '@angular/core';
import { EllipsisPipePipe } from './ellipsis-pipe.pipe';

export const PIPES = [
    EllipsisPipePipe
];

@NgModule({
    declarations: PIPES,
    exports: PIPES
})
export class PipesModule { }
