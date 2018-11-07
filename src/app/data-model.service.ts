import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/internal/Observable';
import {Platform} from '@ionic/angular';
import {Config, Group} from './Model';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {GeofenceService} from './geofence.service';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  private data: Config = new Config();
  private observer = new BehaviorSubject<Config>(this.data);
  private loaded = false;

  constructor(private storage: Storage, private platform: Platform,
              private geofenceService: GeofenceService) {
    this.platform.ready().then(() => this.load());
  }

  save() {
    this.storage.set('locallist', JSON.stringify(this.data)).catch((err) => console.log(err));
    Object.keys(this.data.groups).forEach((group) => this.data.groups[group].points.forEach((point) => this.geofenceService.addGeofence(point)));
    this.observer.next(this.data);
  }

  load() {
    return this.storage.get('locallist').catch((err) => console.log(err)).then((resp) => {
      if (resp) {
        this.data = JSON.parse(resp);
        this.observer.next(this.data);
      }
      this.loaded = true;
    });
  }

  updateGroup(group: Group): void {
    this.data.groups[group.id] = group;
    this.save();
  }

  deleteGroup(group: Group): void {
    delete this.data.groups[group.id];
    this.save();
  }

  getDataObserver(): Observable<Config> {
    return this.observer.asObservable();
  }
}
