import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengLibModule } from './primeng/primengLib.module';
import {CheckboxModule} from 'primeng/checkbox';
import { MenuComponent } from './menu/menu.component';
import { PartCreationComponent } from './part-creation/part-creation.component';
import { PartsSummaryComponent } from './parts-summary/parts-summary.component';
import { ColourCodingComponent } from './colour-coding/colour-coding.component';
import { MasterDataComponent } from './master-data/master-data.component';

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
    // PrimengLibModule,
    FormsModule,
    ReactiveFormsModule,
    // CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
