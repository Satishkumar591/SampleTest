import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent  {

  public profileDetails: any;
  public allProfiles: any;

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private service: UserService) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.profileDetails = params;
      this.allProfiles = this.service.getSessionData('details');
      console.log(this.allProfiles, 'ALL_PROFILES')
    });
  }

  navigateTo() {
    this.router.navigate(['/gesture-view'])
  }

  logChoice(event: any) {
    console.log(event)
  }

}
