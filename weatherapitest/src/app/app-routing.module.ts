import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityDetailsComponent } from './city-details/city-details.component';
import { CityListComponent } from './city-list/city-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'list-of-cities', pathMatch: 'full' //default routing
  },
  {
    path: 'list-of-cities', component: CityListComponent
  },
  {
    path: 'city-detail', component: CityDetailsComponent
  },
  {
    path: '**', component: NotFoundComponent // wilecart routing 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
