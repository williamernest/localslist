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
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'edit-group/:id', loadChildren: './edit/edit-group.module#EditGroupPageModule' },
  { path: 'edit-group', loadChildren: './edit/edit-group.module#EditGroupPageModule' },
  { path: 'view-group/:id', loadChildren: './view-group/view-group.module#ViewGroupPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
