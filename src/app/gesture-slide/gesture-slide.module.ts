import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { GestureSlideComponent } from './gesture-slide.component';
import { GestureSlideRoutingModule } from './gesture-slide-routing.module';


@NgModule({
  declarations: [GestureSlideComponent],
  imports: [
    CommonModule,
    GestureSlideRoutingModule,
    IonicModule,
    MaterialModule
  ]
})
export class GestureSlideModule { }
