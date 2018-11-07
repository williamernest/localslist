import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPointPage } from './edit-point.page';
import {TopAppBarModule} from '../top-app-bar/top-app-bar.module';
import {MapModule} from '../map/map.module';

const routes: Routes = [
  {
    path: '',
    component: EditPointPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      TopAppBarModule, RouterModule, MapModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPointPage]
})
export class EditPointPageModule {}
