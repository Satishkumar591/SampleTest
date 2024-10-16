import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../api/user.service';
import Swiper from 'swiper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  profileDetails: any = [];

  constructor(private service: UserService, private router: Router) {}


  ngOnInit() {
    this.service.getProfileDetails().subscribe((response) => {
      this.profileDetails = response;
      this.service.setSessionData('details', this.profileDetails);
      console.log(this.profileDetails, 'RESPONSE')
    })
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  navigateToProfile(rowData: any) {
    this.router.navigate(['/profile-details'], {queryParams: rowData})
  }

}
