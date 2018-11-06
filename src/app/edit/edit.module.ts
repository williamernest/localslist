import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {IonicModule, NavParams} from '@ionic/angular';

import { EditPage } from './edit.page';
import {EditViewComponent} from '../edit-view/edit-view.component';
import {MapModule} from '../map/map.module';
import {TopAppBarModule} from '../top-app-bar/top-app-bar.module';

const routes: Routes = [
  {
    path: '',
    component: EditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapModule,
    TopAppBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPage, EditViewComponent],
})
export class EditPageModule {}
