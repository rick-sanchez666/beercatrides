import { Component, OnInit } from '@angular/core';
import { IRideRequest } from 'src/app/models/ride';
import { RideRequestService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss']
})
export class RidesComponent implements OnInit {
  rides: Array<IRideRequest> = [];
  constructor(private rideService: RideRequestService) { }

  ngOnInit(): void {
    this.rideService.getAllRideRequest().subscribe((data: any[]) => {
      this.rides = data;
    })
  }

  async accept(id:string) {
    let req = this.rides.filter( r => r.id ==id)[0];
    let res = await this.rideService.acceptRide(req);
    console.log(res);
    console.log("send notification")
  }


}
