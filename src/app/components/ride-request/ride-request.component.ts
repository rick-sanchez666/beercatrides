import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RideRequestService } from 'src/app/services/ride.service';
import { LOCATIONS_LIST } from 'src/constant';

@Component({
  selector: 'app-ride-request',
  templateUrl: './ride-request.component.html',
  styleUrls: ['./ride-request.component.scss']
})
export class RideRequestComponent implements OnInit {

  locationList: string[] = [];
  requestForm: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    dateOfTrip: new FormControl(''),
    seatsRequested: new FormControl('')
  })
  displaySuccessMessage = false;

  constructor(private rideService: RideRequestService) { }

  ngOnInit(): void {
    this.locationList = LOCATIONS_LIST;
  }

  submit() {
    const payload = {...this.requestForm.value}
    this.rideService.newRequest(payload)
    .then( data => {
      this.displaySuccessMessage = true;
      this.requestForm.reset({});
    })
    .catch( err => {
      this.displaySuccessMessage = true;
      console.log(err)
    })
  }

}
