import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScreenComponent } from './screen/screen.component';
import {Geofence} from "@ionic-native/geofence/ngx"
import {DataModelService} from './data-model.service';

@NgModule({
  declarations: [AppComponent, ScreenComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(
        {
          name: '__mydb',
          driverOrder: ['indexeddb', 'sqlite', 'websql']
        }
    )
  ],
  providers: [
    StatusBar,
    SplashScreen,
      Geofence,
      DataModelService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
