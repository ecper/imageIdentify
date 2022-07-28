import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextIdentifyPage } from './text-identify.page';

const routes: Routes = [
  {
    path: '',
    component: TextIdentifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextIdentifyPageRoutingModule {}
