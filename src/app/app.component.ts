import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
    this.auth.setAuthState();
   }

  ngOnInit() {
    this.auth.isUserAuthenticated$.subscribe( flag => {
      if(flag) {
        return;
      } else {
        this.auth.routeToSignIn()
      }
    })
  }



}
