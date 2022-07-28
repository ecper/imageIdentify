import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyzedImageListPage } from './analyzed-image-list.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyzedImageListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyzedImageListPageRoutingModule {}
