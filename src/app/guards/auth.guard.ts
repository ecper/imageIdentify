import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private api: ApiService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (this.api.userLoggedIn) {
			return true;
		} else {
			this.router.navigate(["/home"]);
			return false;
		}
	}
}