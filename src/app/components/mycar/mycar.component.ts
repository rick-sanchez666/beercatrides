import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mycar',
  templateUrl: './mycar.component.html',
  styleUrls: ['./mycar.component.scss']
})
export class MycarComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    company: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    capacity: new FormControl(4, [Validators.required]),
  })
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.userService.updateUserCars(this.profileForm.value)
    .then( val => {
      this.userService.removeUserAndFetch()
      this.router.navigate(['/'])
    })
  }

}
