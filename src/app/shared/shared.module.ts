import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes';
import { ClickOutsideModule } from 'ng-click-outside';
import { TooltipModule } from 'ng2-tooltip-directive';
@NgModule({
    declarations: [],
    imports: [
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        CommonModule,
        ClickOutsideModule,
        TooltipModule
    ],
    exports: [
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        CommonModule,
        ClickOutsideModule,
        TooltipModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: []
})

export class SharedModule { }
