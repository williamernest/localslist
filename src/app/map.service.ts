import { Injectable } from '@angular/core';
import {LatLon} from './Model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public lastSelectedPoint: LatLon;

  constructor() { }
}
