import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
	{
		path: "home",
		loadChildren: () =>
			import("./home/home.module").then((m) => m.HomePageModule),
	},
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "image-identify",
		loadChildren: () =>
			import("./pages/image-identify/image-identify.module").then(
				(m) => m.ImageIdentifyPageModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: "analyzed-image-list",
		loadChildren: () =>
			import("./pages/analyzed-image-list/analyzed-image-list.module").then(
				(m) => m.AnalyzedImageListPageModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: "label-identify",
		loadChildren: () =>
			import("./pages/label-identify/label-identify.module").then(
				(m) => m.LabelIdentifyPageModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: "text-identify",
		loadChildren: () =>
			import("./pages/text-identify/text-identify.module").then(
				(m) => m.TextIdentifyPageModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: "landmark-identify",
		loadChildren: () =>
			import("./pages/landmark-identify/landmark-identify.module").then(
				(m) => m.LandmarkIdentifyPageModule
			),
		canActivate: [AuthGuard],
	},
	{ path: "**", redirectTo: "home" },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
