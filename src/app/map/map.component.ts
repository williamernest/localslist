import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    Marker,
    Environment, LatLng,
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
    circles = [];
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
      if (change['points']) {
        if (this.map) {
          this.updatePoints();
        }
      }
    }

    ngOnDestroy() {
      this.removeAll();

      if (this.map) {
        this.map.destroy();
      }
    }

    loadMap() {

      // This code is necessary for browser
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC8FVblmzrCmPKffbexACfScZPG29ur9go',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyC8FVblmzrCmPKffbexACfScZPG29ur9go'
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
          zoom: 14,
          tilt: 30,
          target: points,
        },
        controls: {
          'zoom': false,       
          'mapToolbar': false  
        },
        preferences: {
          zoom: {
            minZoom: 1,
            maxZoom: 18
          }
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);
      console.log('map options', mapOptions);
      this.addPoints();

      if (this.type === 'selection') {
        this.centerMarker = this.map.addMarkerSync({
              title: 'New Location',
              icon: '#174B6D',
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

    addPoints() {
      this.points.forEach((point) => {
        if (point.location && this.map) {
          this.markers.push(this.map.addMarkerSync({
            title: point.title,
            icon: '#174B6D',
            animation: 'DROP',
            position: {
              lat: point.location.lat,
              lng: point.location.lon
            }
          }));

          if (point.radius !== 0) {
              this.map.addCircle({
                  center: new LatLng(point.location.lat, point.location.lon),
                  radius: point.radius,
                  fillColor: '#FFB791',
                  fillOpacity: .4,
                  strokeColor: '#FF8256'
              }).then((circ) => this.circles.push(circ));
          }
        }
      });
    }

    updatePoints() {
      this.removeAll();
      this.addPoints();
    }

    removeAll() {
      this.markers = this.markers.filter((mark) => {
        mark.remove();
        return false;
      });
      this.circles = this.circles.filter((circ) => {
        circ.remove();
        return false;
      });
    }
}
