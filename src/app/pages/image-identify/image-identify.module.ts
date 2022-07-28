import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ImageIdentifyPageRoutingModule } from "./image-identify-routing.module";

import { ImageIdentifyPage } from "./image-identify.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ImageIdentifyPageRoutingModule,
	],
	declarations: [ImageIdentifyPage],
})
export class ImageIdentifyPageModule {}
