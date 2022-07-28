import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelIdentifyPage } from './label-identify.page';

const routes: Routes = [
  {
    path: '',
    component: LabelIdentifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabelIdentifyPageRoutingModule {}
