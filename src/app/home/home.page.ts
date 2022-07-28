import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginForm } from "src/interfaces/interface";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { ApiService } from "../services/api.service";
import Swal from "sweetalert2";
@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	validationsForm = new FormGroup<LoginForm>({
		email: new FormControl<string>("", [Validators.required, Validators.email]),
		password: new FormControl<string>("", [
			Validators.required,
			Validators.minLength(8),
		]),
	});

	submitted: boolean = false;

	constructor(
		private auth: AngularFireAuth,
		private db: AngularFireDatabase,
		public api: ApiService
	) {
		this.auth.user.subscribe((user) => {
			this.api.fbUser = user;
			if (user) {
				this.api.userLoggedIn = true;
			} else {
				this.api.userLoggedIn = false;
			}
		});
	}

	login() {
		this.auth
			.signInWithEmailAndPassword(
				this.validationsForm.value.email,
				this.validationsForm.value.password
			)
			.then(() => {
				this.api.getApiKey();
			})
			.catch((error) => {
				let message = "";

				if (error.code === "auth/invalid-email") {
					// メールアドレスの形式がおかしい

					message = "メールアドレスの形式が違います";
				} else if (error.code === "auth/user-disabled") {
					// ユーザが無効になっている
					message = "ユーザーが無効です";
				} else if (
					error.code === "auth/wrong-password" ||
					error.code === "auth/user-not-found"
				) {
					// パスワードが間違っている
					message = "パスワードが違います";
				} else if (error.code === "auth/too-many-requests") {
					// 何度もパスワードを間違えた
					message =
						"複数回ログイン失敗したようです。しばらく経ってからまたログインしてください";
				} else {
					// その他

					message = "不明なエラーが発生しました。\n" + error;
				}

				Swal.fire({
					heightAuto: false, //これないと後ろが透過しない
					icon: "error",
					title: "ログインに失敗しました",
					text: message,
					confirmButtonColor: "#00acee",
				});
			});
	}

	signup() {
		this.auth
			.createUserWithEmailAndPassword(
				this.validationsForm.value.email,
				this.validationsForm.value.password
			)
			.then((val) => {
				this.submitted = true;
				const registerJson = {
					email: this.validationsForm.value.email,
					createdAt: Date.now(),
					updatedAt: Date.now(),
					isUser: true,
				};
				this.db.database.ref("users/" + val.user.uid).update(registerJson);
				this.submitted = false;
				this.api.getApiKey();
			});
	}
}
