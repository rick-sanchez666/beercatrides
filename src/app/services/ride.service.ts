import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IRideRequest, ITrip } from '../models/ride';
import { DbService } from './db.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RideRequestService {
  private ridePool = "ridepool";
  private trips = "trips";
  constructor(private db: DbService, private userService: UserService, private router: Router) { }

  newRequest(payload: any) {
    let { from, to, seatsRequested, dateOfTrip } = payload;
    let userId = this.userService.getUserId();
    let newReq = {accepted: false,from, to, seatsRequested, dateOfTrip, requestedBy: userId };
    return this.db.createDoc(this.ridePool, newReq);
  }

  getAllRideRequest() {
    return this.db.getAllDocumentsWithId(this.ridePool);
  }

  createTrip(payload: any) {
    // get car details for total seats
    let userInfo: any = this.userService.getUserInfo();
    if (!userInfo.hasOwnProperty('myCars') || userInfo['myCars'].length == 0) {
      alert("please enter you car details to continue");
      this.router.navigate(['/mycars']);
      return  Promise.reject(new Error('userInfoMissing'));
    } else {
      const {from, to, dateOfTrip, requestedBy, seatsRequested} = payload;
      let p: ITrip = {
        acceptedBy: this.userService.getUserId(),
        from, to, dateOfTrip,requestedBy,
        totalSeatsAvailable: userInfo['myCars'][0].capacity,
        acceptedRideRequest: [{userId: requestedBy, noOfSeats: seatsRequested, status: 'accepted'}],
        pendingRideRequest: [],
        bookingLog: [ {
          action: 'ACCEPTED BY',
          userId: this.userService.getUserId()
        }]
      }
     return this.db.createDoc(this.trips, p);
    }
  }

  getAcceptedRides() {
    return this.db.getAllDocumentsWithId(this.trips);
  }

  requestFillin(req: any) {
    let pending = req['pendingRideRequest'];
    let user = this.userService.getUserInfo();
    pending.push({user: user['uid'], seatsReserved: 1, status: 'pending'});
    return this.db.update(this.trips, req.id, {pending});
  }

  updateRequestAcceptance(payload: any) {
    this.db.update(this.ridePool, payload.id, {accepted: true})
    .then( res => {
      console.log('updated Request Acceptance');
    })
  }

}
