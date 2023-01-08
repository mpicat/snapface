import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/components/landing-page/landing-page.component";

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    // lay loading (voir face-snaps-routing.module.ts dans le module face-snaps)
    { path: 'facesnaps', loadChildren: () => import('./face-snaps/face-snaps.module').then(m => m.FaceSnapsModule) }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}