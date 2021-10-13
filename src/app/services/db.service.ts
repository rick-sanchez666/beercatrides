import { Injectable } from '@angular/core';
import {
  Firestore, collectionData, collection, DocumentReference, doc, docSnapshots, updateDoc,
  getDoc, deleteDoc, setDoc, addDoc, query, getDocs, collectionSnapshots, docData
} from '@angular/fire/firestore';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private firestore: Firestore) { }

  getAllDocumentsWithId(collectionPath: string) {
    let c = collection(this.firestore, collectionPath);
    return collectionSnapshots(c).pipe(
      map((docs: any) => {
       let arr =   docs.map( (el: any) => {
            return {id: el.id, ...el.data()};
          });

          return arr;
      })
    )
  }

  getAllDocumentsFormatted(collectionPath: string) {
    let collect = collection(this.firestore, collectionPath);
    return collectionData(collect);
  }

  getDocumentById(collectionPath: string, id: string) {
    let path = `${collectionPath}/${id}`;
    let docRef = doc(this.firestore, path);
    return getDoc(docRef);
  }

  createDoc(collectionPath: string, payload: any) {
    let collectionRef = collection(this.firestore, collectionPath);
    return addDoc(collectionRef, payload);
  }

  createDocWithID(collectionPath: string, payload: any) {
    let docRef = doc(this.firestore, collectionPath)
    return setDoc(docRef, payload);
  }

  update(collectionPath: string, id: string, payload: any) {
    let path = `${collectionPath}/${id}`;
    let docRef = doc(this.firestore, path);
    return updateDoc(docRef, payload);
  }

  delete(collectionPath: string, id: string) {
    let path = `${collectionPath}/${id}`;
    let docRef = doc(this.firestore, path);
    return deleteDoc(docRef);
  }

}
