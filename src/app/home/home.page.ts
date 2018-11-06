import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NavController} from '@ionic/angular';
import {DataModelService} from '../data-model.service';
import {Config, Group} from '../Model';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  groups: Array<Group> = [];
  sub: Subscription;
  constructor(private navCtrl: NavController, private dataModel: DataModelService) {}

  addNewGroup(): void {
    this.navCtrl.navigateForward('/edit');
  }

  ngOnInit() {
    this.sub = this.dataModel.getDataObserver().subscribe((data: Config) => {
      this.groups = Array.from(Object.values(data.groups));
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  route(id: string) {
    this.navCtrl.navigateForward('/edit/' + id);
  }
}
