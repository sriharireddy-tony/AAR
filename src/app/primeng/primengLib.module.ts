import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CheckboxModule} from 'primeng/checkbox';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonModule
  ],
  exports: [
    CheckboxModule,
    ButtonModule
  ]
})
export class PrimengLibModule { }
