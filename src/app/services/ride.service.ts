import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { IRideRequest, RideRequest } from '../models/ride';
import { DbService } from './db.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RideRequestService {
  private requestCollection = "rideRequest";
  private ridesCollection = "rides";
  constructor(private db: DbService, private userService: UserService) { }

   newRequest(payload:any) {
    let {from, to , seatsRequested, requestedBy, dateOfTrip} = payload;
    let newReq = new RideRequest(from, to, dateOfTrip, seatsRequested, requestedBy);
    return this.db.createDoc(this.requestCollection, {...newReq});
  }

  getAllRideRequest() {
    return this.db.getAllDocumentsWithId(this.requestCollection)
  }

  async acceptRide(payload:IRideRequest) {
    // get car details for total seats
    let userInfo =  await (await this.userService.getUserInfo()).data() || {};
    let p = {
      accepted: true,
      acceptedBy: 'tT52csVgvlopRHNVsId0',
      seatsReserved: payload.seatsRequested,
      totalSeatsAvailable: userInfo['myCars'][0].capacity,
      passengers: [{user: payload.requestedBy, seatsReserved: payload.seatsRequested}]
    }
    console.log(p)
    this.db.update(this.requestCollection, payload.id, p)
  }

  getAcceptedRides() {
    return this.db.getAllDocumentsWithId(this.ridesCollection);
  }

}
