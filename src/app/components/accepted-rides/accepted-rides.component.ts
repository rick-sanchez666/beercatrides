import { Component, OnInit } from '@angular/core';
import { RideRequestService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-accepted-rides',
  templateUrl: './accepted-rides.component.html',
  styleUrls: ['./accepted-rides.component.scss']
})
export class AcceptedRidesComponent implements OnInit {
  rides: any[] = [];
  constructor(private rideService: RideRequestService) { }

  ngOnInit(): void {
    this.rideService.getAcceptedRides()
    .subscribe( data => {
      this.rides = data;
    })

  }

}
