import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopAppBarComponent} from './top-app-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TopAppBarComponent],
  exports: [TopAppBarComponent]
})
export class TopAppBarModule { }
