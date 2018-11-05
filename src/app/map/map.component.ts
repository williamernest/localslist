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
import { Component } from '@angular/core/';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html'
})
export class MapComponent {
    map: GoogleMap;
    constructor() { }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        // This code is necessary for browser
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCfshD83y_WoimDWwf1R31gEjR2uNOWSt4',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCfshD83y_WoimDWwf1R31gEjR2uNOWSt4'
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