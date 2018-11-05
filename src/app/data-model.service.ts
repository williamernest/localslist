import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  private data: Object;
  private observer = new Subject<Object>();

  constructor(private storage: Storage) {}

  save() {}

  getDataObserver(): Observable<Object> {
    return this.observer.asObservable();
  }
}

