import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/internal/Observable';
import {Platform} from '@ionic/angular';
import {Config, Group} from './Model';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  private data: Config = new Config();
  private observer = new BehaviorSubject<Object>(this.data);

  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => this.load());
  }

  save() {
    this.storage.set('locallist', JSON.stringify(this.data)).catch((err) => console.log(err));
    this.observer.next(this.data);
  }

  load() {
    this.storage.get('locallist').catch((err) => console.log(err)).then((resp) => {
      if (resp) {
        this.data = JSON.parse(resp);
        this.observer.next(this.data);
      }
    });
  }

  getGroup(id: string): Group {
    return this.data.groups[id];
  }

  updateGroup(group: Group): void {
    this.data.groups[group.id] = group;
    this.save();
  }

  getDataObserver(): Observable<Object> {
    return this.observer.asObservable();
  }
}
