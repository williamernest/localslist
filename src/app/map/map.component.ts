import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment,
} from '@ionic-native/google-maps';
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core/';
import {Platform} from '@ionic/angular';
import {Point, LatLon} from '../Model';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html'
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
    map: GoogleMap;
    @Input() points: Array<Point> = [];
    @Input() type = 'selection';
    @Output() cameraPosition = new EventEmitter<LatLon>();

    centerMarker: Marker;

    private markers: Array<Marker> = [];

    constructor(private platform: Platform) { }

    ngAfterViewInit() {
        this.initMap();
    }

    async initMap() {
        await this.platform.ready();
        await this.loadMap();
    }

    ngOnChanges(change: SimpleChanges) {
      if (change) {
        console.log(change);
      }
    }

    ngOnDestroy() {
      if (this.map) {
        this.map.destroy();
      }
    }

    loadMap() {

      // This code is necessary for browser
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyACsx-FWosix8J5bMR3QURX47d452i_g9Q',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyACsx-FWosix8J5bMR3QURX47d452i_g9Q'
      });

      const points = this.points.map((point) => {
        if (point.location && point.location.lat && point.location.lon) {
          return {'lat': point.location.lat, 'lng': point.location.lon};
        }
      });

      if (points.length === 0) {
        points.push({lat: 36.778259, lng: -119.417931});
        points.push({lat: 40.7128, lng: -74.006});
      }

      const mapOptions: GoogleMapOptions = {
        camera: {
          tilt: 30,
          target: points,
        },
        preferences: {
          zoom: {
            minZoom: 18,
            maxZoom: 18
          }
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

        this.points.forEach((point) => this.markers.push(this.map.addMarkerSync({
          title: point.title,
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: point.location.lat,
            lng: point.location.lon
          }
        })));

      if (this.type === 'selection') {
        this.centerMarker = this.map.addMarkerSync({
              title: 'New Location',
              icon: 'red',
              animation: 'DROP',
              position: {
                lat: 0,
                lng: 0,
              }
            }
        );
        this.map.addEventListener(GoogleMapsEvent.CAMERA_MOVE).subscribe(() => {
          const cameraPos = this.map.getCameraTarget();
          this.cameraPosition.emit({lat: cameraPos.lat, lon: cameraPos.lng});
          this.centerMarker.setPosition(this.map.getCameraTarget());
        });
      }
    }
}
