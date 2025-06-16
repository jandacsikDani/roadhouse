import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaceComponent } from './pages/place/place.component';
import { FoodmenuComponent } from './pages/foodmenu/foodmenu.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ControlComponent } from './pages/admin/control/control.component';
import { adminGuard } from './shared/guards/admin-guard.guard';

export const routes: Routes = [
    { path: '', component: MainLayoutComponent, children: [
        { path: '', component: HomeComponent},
        { path: 'rolunk', component: PlaceComponent},
        { path: 'etlap', component: FoodmenuComponent}
    ]},
    { path: 'admin', component: AdminLayoutComponent, title: 'RH - Admin', children: [
        { path: '', component: AdminComponent},
        { path: 'control', component: ControlComponent, canActivate: [adminGuard]}
    ]},
    { path: '**', component: PageNotFoundComponent}
];

RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
})
