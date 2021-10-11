import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedRidesComponent } from './components/accepted-rides/accepted-rides.component';
import { RideRequestComponent } from './components/ride-request/ride-request.component';
import { RidesComponent } from './components/rides/rides.component';

const routes: Routes = [
  {path: 'new', component: RideRequestComponent},
  {path: 'accepted', component: AcceptedRidesComponent},
  {path: '', component: RidesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
