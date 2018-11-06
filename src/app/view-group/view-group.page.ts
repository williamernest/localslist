import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataModelService} from '../data-model.service';
import {Location} from '@angular/common';
import {Group} from '../Model';
import {Subscription} from 'rxjs/internal/Subscription';
import {MDCTabBar} from '@material/tab-bar/index';

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
  currenTab = 'list';

  constructor(private router: Router, private dataModel: DataModelService, private location: Location, private route: ActivatedRoute,
              private myElement: ElementRef) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.sub = this.dataModel.getDataObserver().subscribe((config) => {
        this.group = config.groups[this.id];
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
    this.router.navigate(['/edit-group', this.group.id]);
  }

  navigateBack(): void {
    this.location.back();
  }

  showList() {
    this.currenTab = 'list';
  }

  showMap() {
    this.currenTab = 'map';
  }

}
