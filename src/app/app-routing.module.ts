import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'edit-group/:id', loadChildren: './edit/edit-group.module#EditGroupPageModule' },
  { path: 'edit-group', loadChildren: './edit/edit-group.module#EditGroupPageModule' },
  { path: 'view-group/:id', loadChildren: './view-group/view-group.module#ViewGroupPageModule' },
  { path: 'view-group/:id/point-map', loadChildren: './point-map-select/point-map-select.module#PointMapSelectPageModule' },
  { path: 'view-group/:id/edit-point', loadChildren: './edit-point/edit-point.module#EditPointPageModule' },
  { path: 'view-group/:id/edit-point/:id2', loadChildren: './edit-point/edit-point.module#EditPointPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
