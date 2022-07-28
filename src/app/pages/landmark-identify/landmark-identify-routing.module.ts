import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandmarkIdentifyPage } from './landmark-identify.page';

const routes: Routes = [
  {
    path: '',
    component: LandmarkIdentifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandmarkIdentifyPageRoutingModule {}
