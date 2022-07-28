import { Component, OnInit } from "@angular/core";
import { Photo } from "@capacitor/camera";
import { ApiService } from "src/app/services/api.service";
import { environment } from "src/environments/environment";
@Component({
	selector: "app-label-identify",
	templateUrl: "./label-identify.page.html",
	styleUrls: ["./label-identify.page.scss"],
})
export class LabelIdentifyPage implements OnInit {
	photo: Photo;
	analyzed: boolean = false;
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
		const body = await this.api.analyzeBody(webPath, "OBJECT_LOCALIZATION");

		(
			await this.api.postApiServer(
				environment.visionApiUrl + this.api.apiKey,
				body
			)
		).subscribe((res) => {
			this.responses = Object.values(res)[0][0];
			this.drawPoint();
		});
	}

	//取得した座標から画像にランドマークと顔の枠を描画する。
	async drawPoint() {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const img = document.createElement("img");
		img.src = this.photo.webPath;
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			for (let localizedObjectAnnotation of this.responses
				.localizedObjectAnnotations) {
				ctx.fillStyle = "red";
				ctx.font = "20px Arial";
				const boundingPoly =
					localizedObjectAnnotation.boundingPoly.normalizedVertices;
				for (let pos of boundingPoly) {
					pos.x *= img.width;
					pos.y *= img.height;
				}
				const horizontal = boundingPoly[1].x - boundingPoly[0].x;
				const vertical = boundingPoly[2].y - boundingPoly[0].y;
				ctx.fillText(
					localizedObjectAnnotation.name,
					boundingPoly[0].x,
					boundingPoly[0].y + 20
				);
				ctx.fillText(
					`confidence : ${(localizedObjectAnnotation.score * 100) | 0}%`,
					boundingPoly[0].x,
					boundingPoly[0].y + 50
				);
				ctx.strokeRect(
					boundingPoly[0].x,
					boundingPoly[0].y,
					horizontal,
					vertical
				);
			}
			const data = canvas.toDataURL("image/png", 1);
			this.photo.webPath = data;
			// this.analyze(data);
		};
	}
}
