import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageIdentifyPage } from './image-identify.page';

const routes: Routes = [
  {
    path: '',
    component: ImageIdentifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageIdentifyPageRoutingModule {}
