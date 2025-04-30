import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaceComponent } from './pages/place/place.component';
import { FoodmenuComponent } from './pages/foodmenu/foodmenu.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'helyszin', component: PlaceComponent},
    { path: 'etlap', component: FoodmenuComponent},
    { path: '**', component: PageNotFoundComponent}
];
