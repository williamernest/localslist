import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DataModelService} from '../data-model.service';
import {Config, Group} from '../Model';
import {Subscription} from 'rxjs/internal/Subscription';
import {Router} from '@angular/router';
import {MDCRipple} from '@material/ripple/index';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  groups: Array<Group> = [];
  sub: Subscription;
  elements = [];
  constructor(
    private router: Router,
    private dataModel: DataModelService,
    private myElement: ElementRef
  ) {}

  addNewGroup(): void {
    this.router.navigate(['/edit-group']);
  }

  ngOnInit() {
    this.sub = this.dataModel.getDataObserver().subscribe((data: Config) => {
      this.groups = Array.from(Object.values(data.groups));
    });
  }

  ngAfterViewInit() {
    this.elements.push(new MDCRipple(this.myElement.nativeElement.querySelector('.mdc-icon-button')));
  }

  ngOnDestroy() {
    this.elements.forEach((el) => el.destroy());
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  route(id: string) {
    this.router.navigate(['/view-group', id]);
  }
}
