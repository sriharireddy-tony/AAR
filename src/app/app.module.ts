import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PrimengLibModule } from './primeng/primengLib.module';
import { MenuComponent } from './menu/menu.component';
import { PartCreationComponent } from './part-creation/part-creation.component';
import { PartsSummaryComponent } from './parts-summary/parts-summary.component';
import { ColourCodingComponent } from './colour-coding/colour-coding.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
import {SliderModule} from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PartCreationComponent,
    PartsSummaryComponent,
    ColourCodingComponent,
    MasterDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengLibModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    SliderModule,
    CalendarModule,
    BrowserAnimationsModule,
    AutocompleteLibModule
   
],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
