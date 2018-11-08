import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { Location } from '@angular/common';
import {MapService} from '../map.service';
import {Group, Point} from '../Model';
import { MDCTextField } from '@material/textfield/index';
import { MDCSlider } from '@material/slider/index';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataModelService} from '../data-model.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-point',
  templateUrl: './edit-point.page.html',
  styleUrls: ['./edit-point.page.scss'],
})
export class EditPointPage implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  point: Point = new Point();
  group: Group = new Group();
  elements = [];
  title: string;
  description: string;
  sub: Subscription;
  min = 1;
  max = 10;

  constructor(private mapService: MapService, private location: Location, private myElement: ElementRef,
              private dataModel: DataModelService,
              private router: Router,
              private route: ActivatedRoute,
              private detectRef: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const pointId = this.route.snapshot.paramMap.get('id2');
    if (id) {
      this.sub = this.dataModel.getDataObserver().subscribe((config) => {
        this.group = config.groups[id];

        if (pointId && this.group) {
          const existingPoint = this.group.points.filter((point) => pointId === point.id);
          if (existingPoint.length > 0) {
            this.point = existingPoint[0];
            this.title = this.point.title;
            this.description = this.point.description;
          }
        } else if (this.group && this.group.points.filter((point) => point.id === this.point.id).length === 0) {
          this.group.points.push(this.point);
        }

        setTimeout(() => this.sub.unsubscribe(), 0);
      });
    }
    if (this.mapService.lastSelectedPoint) {
      this.point.location = this.mapService.lastSelectedPoint;
      this.mapService.lastSelectedPoint = null;
    }
  }

  ngAfterViewInit() {
    this.elements = Array.from(this.myElement.nativeElement.querySelectorAll('.mdc-text-field')).map((ele) => new MDCTextField(ele));
    const slider = new MDCSlider(this.myElement.nativeElement.querySelector('.mdc-slider'));
    slider.listen('MDCSlider:change', () => {
      this.point.radius = slider.value;
      this.point = Object.assign({}, this.point);
      this.detectRef.detectChanges();
    });
    setTimeout(() => this.elements.forEach((tf) => tf.layout()), 100);

    this.elements.push(slider);
  }

  ngOnChanges(change: SimpleChanges) {
    this.elements.forEach((el) => el.layout());
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

    this.dataModel.updateGroup(this.group);
    this.router.navigate(['/view-group', this.group.id]);
  }

  deletePoint() {
    this.group.points = this.group.points.filter((pt) => pt.id !== this.point.id);
    this.dataModel.updateGroup(this.group);
    this.router.navigate(['/view-group', this.group.id]);
  }

}
