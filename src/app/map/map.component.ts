import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment, LatLng, LatLngBounds
} from '@ionic-native/google-maps';
import {AfterViewInit, Component, Input} from '@angular/core/';
import {Platform} from '@ionic/angular';
import {Point} from '../Model';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html'
})
export class MapComponent implements AfterViewInit {
    map: GoogleMap;
    @Input() points: Array<Point> = [];


    private markers: Array<Marker> = [];

    constructor(private platform: Platform) { }

    ngAfterViewInit() {
        this.initMap();
    }

    async initMap() {
        await this.platform.ready();
        await this.loadMap();
    }

    loadMap() {

      // This code is necessary for browser
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyACsx-FWosix8J5bMR3QURX47d452i_g9Q',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyACsx-FWosix8J5bMR3QURX47d452i_g9Q'
      });

      const mapOptions: GoogleMapOptions = {
        camera: {
          tilt: 30,
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      this.points.forEach((point) => this.markers.push(this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: point.location.lat,
          lng: point.location.lon
        }
      })));

      const mapZoom = {
        target: [
          ...this.points.map((point) => new LatLng(point.location.lat, point.location.lon)),
        ],
      };
      this.map.animateCamera(mapZoom);

      debugger;
    }
}
