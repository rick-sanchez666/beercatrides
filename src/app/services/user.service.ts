import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection = 'users'
  constructor(private firestore: Firestore) { }

  getUserInfo() {
    let path = `${this.userCollection}/${this.getUserId()}`;
    let docRef = doc(this.firestore,path);
    return getDoc(docRef);
  }

  getUserId() {
    return "tT52csVgvlopRHNVsId0";
  }
}
