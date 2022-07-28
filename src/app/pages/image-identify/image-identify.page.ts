import { Component, OnInit } from "@angular/core";
import { Photo } from "@capacitor/camera";
import { ApiService } from "src/app/services/api.service";
import { environment } from "src/environments/environment";
// import { Storage } from "@capacitor/storage";
@Component({
	selector: "app-image-identify",
	templateUrl: "./image-identify.page.html",
	styleUrls: ["./image-identify.page.scss"],
})
export class ImageIdentifyPage implements OnInit {
	photo: Photo;
	responses: any;
	constructor(private api: ApiService) {}

	ngOnInit() {}

	async addPhoto() {
		const capturedPhoto = await this.api.captureCamera();
		this.photo = capturedPhoto;
	}

	async analyze(webPath: string) {
		const body = await this.api.analyzeBody(webPath, "FACE_DETECTION");

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
		let faceIndex: number = 0;
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const img = document.createElement("img");
		img.src = this.photo.webPath;
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			for (let faceAnnotation of this.responses.faceAnnotations) {
				const boundingPoly = faceAnnotation.boundingPoly.vertices;
				const horizontal = boundingPoly[1].x - boundingPoly[0].x;
				const vertical = boundingPoly[2].y - boundingPoly[0].y;
				for (let landmark of faceAnnotation.landmarks) {
					ctx.fillStyle = "green";
					if (landmark.type === "NOSE_TIP") {
						ctx.font = `20px Arial`;
						ctx.fillText(
							"Face" + (faceIndex + 1),
							boundingPoly[0].x,
							boundingPoly[0].y + 20
						);
						ctx.fillText(
							`confidence : ${(faceAnnotation.detectionConfidence * 100) | 0}%`,
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
					ctx.fillRect(landmark.position.x, landmark.position.y, 4, 4);
				}
				faceIndex++;
			}
			const data = canvas.toDataURL("image/png", 1);
			this.photo.webPath = data;
			// this.analyze(data);
		};
	}
}
