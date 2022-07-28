import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyzedImageListPageRoutingModule } from './analyzed-image-list-routing.module';

import { AnalyzedImageListPage } from './analyzed-image-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyzedImageListPageRoutingModule
  ],
  declarations: [AnalyzedImageListPage]
})
export class AnalyzedImageListPageModule {}
