import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, sendEmailVerification, signInWithEmailAndPassword, updateProfile, getAuth, onAuthStateChanged} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isUserAuthenticated: Subject<boolean> =  new Subject();

  isUserAuthenticated$ = this.isUserAuthenticated.asObservable();
  constructor( private fireAuth: Auth, private router: Router, private userService: UserService) { 
  }

  async signupWithEmailandPassword(payload: any) {
    try {
      let signUpResponse:any = await createUserWithEmailAndPassword(this.fireAuth, payload.email, payload.password);
      if(signUpResponse && !signUpResponse['emailVerified']) {
        let name = `${payload['firstname']} ${payload['lastname']}`;
        updateProfile(signUpResponse.user, {displayName: name })
        .then( res => { console.log("updated user", res)});
        this.updateUser(signUpResponse.user, payload);

        this.verifyEmail(signUpResponse.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  updateUser(res:any, form: any) {
    console.log(res)
    let payload = {
      uid: res.uid,
      firstname: form['firstname'],
      lastname: form['lastname'],
      email: res['email']
    }
    this.userService.createUser(payload)
    .then( res=> {
      console.log("successfull saved user")
    })
    .catch( res => {
      console.log("failed in updating user in db")
    })
  }

  verifyEmail(user:any) {
    sendEmailVerification(user).then( res => {
      this.router.navigate(['signupsuccess'])
    })
  }

  async signin(payload: any) {
    try {
      let signinResponse = await signInWithEmailAndPassword(this.fireAuth, payload.email, payload.password);
      console.log(signinResponse);
      if(signinResponse.user.emailVerified){
        this.router.navigate(['/'])
      } else {
        this.router.navigate(['getverified']);
      }
    } catch (error) {
      console.log("sigin failed", error)
    }
  }

  setAuthState() {
    let auth =  getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("logging auth state", user)
      if(user) {
        this.isUserAuthenticated.next(true);
      } else {
        this.isUserAuthenticated.next(false);
      }
    })
  }

  signout() {
    let auth = getAuth();
    auth.signOut().then(
      res => {
        console.log("signed out!!")
      }
    )
    .catch(  err => {
      console.log("sign out failed")
    })
  }

  routeToSignIn() {
    this.router.navigate(['/signin'])
  }

  
}
