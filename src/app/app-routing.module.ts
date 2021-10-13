import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RideRequestComponent } from './components/ride-request/ride-request.component';
import { RidesComponent } from './components/rides/rides.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouteGuard } from './guards/route.guard';
import { GetVerifiedComponent } from './misc/get-verified/get-verified.component';
import { SignupSuccessComponent } from './misc/signup-success/signup-success.component';

const routes: Routes = [
  {path: '', component: RidesComponent, canActivate: [RouteGuard], pathMatch: 'full'},
  {path: 'new', component: RideRequestComponent, canActivate: [RouteGuard]},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signupsuccess', component: SignupSuccessComponent, canActivate: [RouteGuard]},
  {path: 'getverified', component: GetVerifiedComponent, canActivate: [RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
