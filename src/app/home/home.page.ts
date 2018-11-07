import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DataModelService} from '../data-model.service';
import {Config, Group} from '../Model';
import {Subscription} from 'rxjs/internal/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  groups: Array<Group> = [];
  sub: Subscription;
  constructor(
    private router: Router,
    private dataModel: DataModelService
  ) {}

  addNewGroup(): void {
    this.router.navigate(['/edit-group']);
  }

  ngOnInit() {
    this.sub = this.dataModel.getDataObserver().subscribe((data: Config) => {
      this.groups = Array.from(Object.values(data.groups));
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  route(id: string) {
    this.router.navigate(['/view-group', id]);
  }
}
