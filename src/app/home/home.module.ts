import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {MapModule} from '../map/map.module';
import {TopAppBarModule} from '../top-app-bar/top-app-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      MapModule,
      TopAppBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
