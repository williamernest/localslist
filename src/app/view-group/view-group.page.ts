import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataModelService} from '../data-model.service';
import {Location} from '@angular/common';
import {Group} from '../Model';
import {Subscription} from 'rxjs/internal/Subscription';
import {MDCTabBar} from '@material/tab-bar/index';
import {ChangeDetectionPerfRecord} from '@angular/platform-browser/src/browser/tools/common_tools';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.page.html',
  styleUrls: ['./view-group.page.scss'],
})
export class ViewGroupPage implements OnInit, OnDestroy, AfterViewInit {

  group: Group = new Group();
  id: string;
  sub: Subscription;
  tab: MDCTabBar;
  currentTab = 'list';

  constructor(private router: Router, private dataModel: DataModelService, private location: Location, private route: ActivatedRoute,
              private myElement: ElementRef, private detectChange: ChangeDetectorRef) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.sub = this.dataModel.getDataObserver().subscribe((config) => {
        this.group = config.groups[this.id];
        this.detectChange.detectChanges();
      });
    }
  }

  ngAfterViewInit() {
    this.tab = new MDCTabBar(this.myElement.nativeElement.querySelector('.mdc-tab-bar'));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  editGroup(): void {
    this.router.navigate(['edit-group', this.group.id]);
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }

  showList() {
    this.currentTab = 'list';
  }

  showMap() {
    this.currentTab = 'map';
  }

  addNewPoint() {
    this.router.navigate(['view-group/', this.group.id, 'point-map']);
  }

  editPoint(id: string) {
    this.router.navigate(['/view-group', this.group.id, 'edit-point', id]);
  }

}
