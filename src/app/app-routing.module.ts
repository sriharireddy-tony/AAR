import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColourCodingComponent } from './colour-coding/colour-coding.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { PartCreationComponent } from './part-creation/part-creation.component';
import { PartsSummaryComponent } from './parts-summary/parts-summary.component';

const routes: Routes = [
  { path: '', redirectTo: 'partsCreation', pathMatch: 'full' },
  {path: 'partsCreation', component: PartCreationComponent},
  {path: 'partsSummary', component: PartsSummaryComponent},
  {path: 'colourCoding', component: ColourCodingComponent},
  {path: 'masterData', component: MasterDataComponent},
  { path: "**", redirectTo: 'partsCreation'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
