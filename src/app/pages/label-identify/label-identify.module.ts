import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabelIdentifyPageRoutingModule } from './label-identify-routing.module';

import { LabelIdentifyPage } from './label-identify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabelIdentifyPageRoutingModule
  ],
  declarations: [LabelIdentifyPage]
})
export class LabelIdentifyPageModule {}
