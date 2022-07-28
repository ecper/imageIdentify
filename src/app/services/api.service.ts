import { Injectable } from "@angular/core";
import { User } from "firebase/auth";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { AngularFireDatabase } from "@angular/fire/compat/database";
@Injectable({
	providedIn: "root",
})
export class ApiService {
	public userLoggedIn: boolean = false;
	public fbUser: User | null;
	public apiKey: string;
	constructor(private http: HttpClient, private db: AngularFireDatabase) {
		this.getApiKey();
	}

	async getApiKey() {
		const snapshot = await this.db.database.ref("visionApiKey").once("value");
		this.apiKey = snapshot.val();
	}

	async blobToBase64(blob: Blob) {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader.onload = function () {
				resolve(reader.result);
			};
			reader.readAsDataURL(blob);
		});
	}

	async captureCamera() {
		try {
			return await Camera.getPhoto({
				resultType: CameraResultType.Uri,
				source: CameraSource.Camera,
				quality: 100,
			});
		} catch {}
	}

	async getApiServer(url: string, params?: any) {
		return this.http.get(url, { params: params }).pipe(take(1));
	}

	async postApiServer(url: string, body?: any) {
		return this.http.post(url, { ...body }).pipe(take(1));
	}

	async analyzeBody(webPath: string, type: string) {
		const response = await fetch(webPath);
		const blob = await response.blob();
		const imageBase64 = ((await this.blobToBase64(blob)) as string).split(
			","
		)[1];
		const body = {
			requests: [
				{
					image: {
						content: imageBase64,
					},
					features: [
						{
							type: type,
							maxResults: 10,
						},
					],
				},
			],
		};
		return body;
	}
}
