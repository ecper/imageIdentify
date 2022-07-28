import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextIdentifyPageRoutingModule } from './text-identify-routing.module';

import { TextIdentifyPage } from './text-identify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextIdentifyPageRoutingModule
  ],
  declarations: [TextIdentifyPage]
})
export class TextIdentifyPageModule {}
