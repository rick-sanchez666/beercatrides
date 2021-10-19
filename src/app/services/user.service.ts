import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, updateDoc, collectionSnapshots, collection } from '@angular/fire/firestore';
import { ICar } from '../models/user';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  private userCollection = 'users';
  private userProfile: any;
  constructor(private firestore: Firestore, private db: DbService) { }

  getUserInfo() {
    if(this.userProfile) {
      return this.userProfile;
    }
    return JSON.parse(localStorage.getItem('userProfile') || "") || {};
  }

  fetchUserProfile(id:string): void {
    let path = `${this.userCollection}/${id}`;
    let docRef = doc(this.firestore,path);
    getDoc(docRef).then( user => {
      this.userProfile = user.data();
      localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    })
    .catch( err => {
      console.error('failed to fetch user', err)
    })
  }

  getUserId() {
    return this.getUserInfo().uid;
  }

  updateUserCars(payload: ICar) {
    let path = `${this.userCollection}/${this.getUserId()}`;
    let docRef = doc(this.firestore,path);
    let myCars = this.getUserInfo()['myCars'] ? [...this.getUserInfo()['myCars']] : [payload]
    return updateDoc(docRef, {myCars})
  }

  createUser(user:any) {
    let path = `${this.userCollection}/${user.uid}`
    return this.db.createDocWithID(path,user);
  }

  removeUserAndFetch() {
    localStorage.removeItem('userProfile');
    this.fetchUserProfile(this.getUserId());
  }
}
