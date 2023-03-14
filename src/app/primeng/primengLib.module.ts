import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   PaginatorModule,
   TableModule,
   ButtonModule,
   CalendarModule,
   BrowserModule,
   BrowserAnimationsModule,
   AccordionModule,
   ToastModule,
   DropdownModule,
   InputTextModule
  
  
   
   
  ],
  exports: [
    PaginatorModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
   ToastModule,
   DropdownModule,
   InputTextModule
  ]
})
export class PrimengLibModule { }
