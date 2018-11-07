import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MapService} from '../map.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataModelService} from '../data-model.service';
import {Group, LatLon, Point} from '../Model';

@Component({
  selector: 'app-point-map-select',
  templateUrl: './point-map-select.page.html',
  styleUrls: ['./point-map-select.page.scss'],
})
export class PointMapSelectPage implements OnInit, OnDestroy {

  currentPoint: LatLon;
  id: string;
  group: Group;
  sub: Subscription;

  constructor(private router: Router,
              private mapService: MapService,
              private route: ActivatedRoute,
              private dataModel: DataModelService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sub = this.dataModel.getDataObserver().subscribe((config) => {
        this.group = config.groups[id];
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  navigateBack() {
    this.router.navigate(['/view-group', this.group.id]);
  }

  selectPoint() {
    const point = new Point();
    point.location = {lat: this.currentPoint.lat, lon: this.currentPoint.lon};
    this.mapService.lastSelectedPoint = point.location;
    this.router.navigate(['/view-group', this.group.id, 'edit-point']);
  }
}
