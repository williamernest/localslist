import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PointMapSelectPage } from './point-map-select.page';
import {MapModule} from '../map/map.module';
import {TopAppBarModule} from '../top-app-bar/top-app-bar.module';

const routes: Routes = [
  {
    path: '',
    component: PointMapSelectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapModule, RouterModule, TopAppBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PointMapSelectPage]
})
export class PointMapSelectPageModule {}
