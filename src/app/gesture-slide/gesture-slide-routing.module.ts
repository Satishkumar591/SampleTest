import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestureSlideComponent } from './gesture-slide.component';

const routes: Routes = [
  {
    path: '',
    component: GestureSlideComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestureSlideRoutingModule { }
