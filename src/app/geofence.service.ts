import { Injectable } from '@angular/core';
import {Point} from './Model';
import { Geofence } from '@ionic-native/geofence/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {

  constructor(private geofence: Geofence, private platform: Platform) {
    if (this.platform.is('ios') || this.platform.is('android')) {
      // initialize the plugin
      this.geofence.initialize().then(
          // resolved promise does not return a value
          () => console.log('Geofence Plugin Ready'),
          (err) => console.log(err)
      );
    }
  }

  public addGeofence(point: Point) {
    if (!point.location && point.radius > 0) { return; }

    const notifDesc = point.description ? point.description : '';
    let x = 0;

    // options describing geofence
    const fence = {
      id: point.id, // any unique ID
      latitude: point.location.lat, // center of geofence radius
      longitude: point.location.lon,
      radius: point.radius, // radius to edge of geofence in meters
      transitionType: 1, // 1: Enter, 2: Leave, 3: Both
      notification: { // notification settings
        id: x++, // any unique ID (number)
        title: `LocalList - ${point.title}`, // notification title
        text: notifDesc, // notification body
        openAppOnClick: true // open app when notification is tapped
      }
    };
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.geofence.addOrUpdate(fence).then(
          () => console.log('Geofence added'),
          (err) => console.log('Geofence failed to add')
      );
    }

  }
}
