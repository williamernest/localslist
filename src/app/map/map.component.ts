import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment
} from '@ionic-native/google-maps';
import {AfterViewInit, Component} from '@angular/core/';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html'
})
export class MapComponent implements AfterViewInit {
    map: GoogleMap;
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
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        const marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: 43.0741904,
                lng: -89.3809802
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert('clicked');
        });
    }
}