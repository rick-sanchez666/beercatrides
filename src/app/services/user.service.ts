import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection = 'users'
  constructor(private firestore: Firestore, private db: DbService) { }

  getUserInfo() {
    let path = `${this.userCollection}/${this.getUserId()}`;
    let docRef = doc(this.firestore,path);
    return getDoc(docRef);
  }

  getUserId() {
    return "tT52csVgvlopRHNVsId0";
  }

  createUser(user:any) {
    let path = `${this.userCollection}/${user.uid}`
    return this.db.createDocWithID(path,user)
  }
}
