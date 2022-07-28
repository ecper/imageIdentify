import { Component, OnInit } from "@angular/core";
import { Photo } from "@capacitor/camera";
import { ApiService } from "src/app/services/api.service";
import { environment } from "src/environments/environment";
@Component({
	selector: "app-text-identify",
	templateUrl: "./text-identify.page.html",
	styleUrls: ["./text-identify.page.scss"],
})
export class TextIdentifyPage implements OnInit {
	photo: Photo;
	analyzed: boolean = false;
	text: string = "";
	responses: any;
	constructor(private api: ApiService) {}

	ngOnInit() {}
	async addPhoto() {
		const capturedPhoto = await this.api.captureCamera();
		this.photo = capturedPhoto;
		this.analyzed = false;
	}

	async analyze(webPath: string) {
		this.analyzed = true;
		const body = await this.api.analyzeBody(webPath, "TEXT_DETECTION");

		(
			await this.api.postApiServer(
				environment.visionApiUrl + this.api.apiKey,
				body
			)
		).subscribe((res) => {
			this.responses = Object.values(res)[0][0];
			this.text = this.responses.fullTextAnnotation.text;
		});
	}
}
