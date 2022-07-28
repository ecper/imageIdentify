import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandmarkIdentifyPageRoutingModule } from './landmark-identify-routing.module';

import { LandmarkIdentifyPage } from './landmark-identify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandmarkIdentifyPageRoutingModule
  ],
  declarations: [LandmarkIdentifyPage]
})
export class LandmarkIdentifyPageModule {}
