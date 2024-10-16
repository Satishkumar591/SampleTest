import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile-details',
    loadChildren: () => import('./profile-details/profile-details.module').then(m => m.ProfileDetailsModule)
  },
  {
    path: 'gesture-view',
    loadChildren: () => import('./gesture-slide/gesture-slide.module').then(m => m.GestureSlideModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
