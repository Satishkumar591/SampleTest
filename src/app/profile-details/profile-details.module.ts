import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { ProfileDetailsComponent } from './profile-details.component';
import { ProfileDetailsRoutingModule } from './profile-details-routing.module';



@NgModule({
  declarations: [ProfileDetailsComponent],
  imports: [
    CommonModule,
    ProfileDetailsRoutingModule,
    IonicModule,
    MaterialModule
  ]
})
export class ProfileDetailsModule { }
