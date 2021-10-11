import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { IRideRequest, NewRide, RideRequest } from '../models/ride';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class RideRequestService {
  private requestCollection = "rideRequest";
  private ridesCollection = "rides";
  constructor(private db: DbService) { }

   newRequest(payload:any) {
    let {from, to , seats, requestedBy, dateOfTrip} = payload;
    let newReq = new RideRequest(from, to, dateOfTrip, seats, requestedBy);
    return this.db.createDoc(this.requestCollection, {...newReq});
  }

  getAllRideRequest() {
    return this.db.getAllDocumentsWithId(this.requestCollection)
  }

  async acceptRide(payload:IRideRequest) {
    let id = payload.id;
    await this.acceptRequest(payload);
    let newRide = new NewRide(true, 'tT52csVgvlopRHNVsId0', [id]);
    return this.db.createDoc(this.ridesCollection, {...newRide});
  }

  private acceptRequest(payload:any) {
    let id = payload.id;
    delete payload.id;
    payload.accepted = true;
    return this.db.update(this.requestCollection, id, payload);
  }

  getAcceptedRides() {
    return this.db.getAllDocumentsWithId(this.ridesCollection);
  }

}
