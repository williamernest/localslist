import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {MapService} from '../map.service';
import {Group, Point} from '../Model';
import { MDCTextField} from '@material/textfield/index';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataModelService} from '../data-model.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-point',
  templateUrl: './edit-point.page.html',
  styleUrls: ['./edit-point.page.scss'],
})
export class EditPointPage implements OnInit, AfterViewInit, OnDestroy {

  point: Point = new Point();
  group: Group = new Group();
  elements = [];
  title: string;
  description: string;
  sub: Subscription;

  constructor(private mapService: MapService, private location: Location, private myElement: ElementRef,
              private dataModel: DataModelService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const pointId = this.route.snapshot.paramMap.get('id2');
    if (id) {
      this.sub = this.dataModel.getDataObserver().subscribe((config) => {
        this.group = config.groups[id];

        if (pointId) {
          const existingPoint = this.group.points.filter((point) => pointId === point.id);
          if (existingPoint.length > 0) {
            this.point = existingPoint[0];
          }
        } else if (this.group.points.filter((point) => point.id === this.point.id).length === 0){
          this.group.points.push(this.point);
        }
      });
    }
    if (this.mapService.lastSelectedPoint) {
      this.point.location = this.mapService.lastSelectedPoint;
      this.mapService.lastSelectedPoint = null;
    }
  }

  ngAfterViewInit() {
    this.elements = Array.from(this.myElement.nativeElement.querySelectorAll('.mdc-text-field')).map((ele) => new MDCTextField(ele));
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
    this.elements.forEach((ele) => ele.destroy());
  }

  navigateBack() {
    this.location.back();
  }

  save() {
    this.point.title = this.title;
    this.point.description = this.description;
    // this.point.raduis = this.radius;
    this.dataModel.updateGroup(this.group);
    this.router.navigate(['/view-group', this.group.id]);
  }

  deletePoint() {
    this.group.points = this.group.points.filter((pt) => pt.id !== this.point.id);
    this.dataModel.updateGroup(this.group);
    this.router.navigate(['/view-group', this.group.id]);
  }

}
