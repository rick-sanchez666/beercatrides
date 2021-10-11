import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } 
from '@angular/fire/app';
import { getAuth, provideAuth } 
from '@angular/fire/auth';
import { getFirestore, provideFirestore } 
from '@angular/fire/firestore';
import { getStorage, provideStorage } 
from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RideRequestComponent } from './components/ride-request/ride-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RidesComponent } from './components/rides/rides.component';

const firebaseConfig = {
  apiKey: "AIzaSyAR5EPW82S9z4mj8xijtAt9Q_qtanA3EDI",
  authDomain: "beercatrides.firebaseapp.com",
  projectId: "beercatrides",
  storageBucket: "beercatrides.appspot.com",
  messagingSenderId: "101255837770",
  appId: "1:101255837770:web:8a1d06d1622800e54b4eb3",
  measurementId: "G-R0NJ45LVTQ"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RideRequestComponent,
    RidesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
