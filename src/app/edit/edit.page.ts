import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Group} from '../Model';
import {DataModelService} from '../data-model.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  group: Group = new Group();

  constructor(private navCtrl: NavController, private dataModel: DataModelService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('group.id');
    if (id) {
      this.group = this.dataModel.getGroup(id);
    }
  }

  async cancel() {
    await this.navCtrl.goBack();
  }

  save() {
    this.dataModel.updateGroup(this.group);
  }
}
