import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.isUserAuthenticated$.subscribe( val => {
      if(val) {
        this.router.navigate([''])
      }
    })
  }

  submit () {
    this.auth.signin(this.signinForm.value)
  }

}
