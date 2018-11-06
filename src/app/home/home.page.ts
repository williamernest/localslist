import {Component, ViewEncapsulation} from '@angular/core';
import {NavController} from '@ionic/angular';
import {EditPage} from '../edit/edit.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  addNewGroup(): void {
    this.navCtrl.navigateForward('/edit');
  }

}
