import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IRideRequest, ITrip } from 'src/app/models/ride';
import { RideRequestService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {
  rides: any[] = [];
  constructor(private rideService: RideRequestService) { }

  ngOnInit(): void {
    this.rideService.getAllRideRequest()
    .subscribe((data: any[]) => {
      this.rides = data;
    })
  }

  accept(id:string) {
    let req = this.rides.filter( r => r.id ==id)[0];
   this.rideService.createTrip(req)
   .then( res => {
    this.rideService.updateRequestAcceptance(req);
   })
   .catch( err => {
     console.log(err)
   })
  }

  requestFillIn(id:string) {
    let req = this.rides.filter( r => r.id ==id)[0];
    this.rideService.requestFillin(req)
    .then( res => {
      console.log("ride request initiated")
    })
  }


}
