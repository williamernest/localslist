import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { Group} from '../Model';
import {DataModelService} from '../data-model.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/internal/Subscription';
import { MDCTextField} from '@material/textfield/index';


@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss'],
})
export class EditGroupPage implements OnInit, OnDestroy, AfterViewInit {

  group: Group = new Group();
  sub: Subscription;
  elements: Array<MDCTextField> = [];
  title: string;
  description: string;

  constructor(private router: Router, private dataModel: DataModelService, private location: Location, private route: ActivatedRoute,
              private myElement: ElementRef) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sub = this.dataModel.getDataObserver().subscribe((config) => {
        this.group = config.groups[id];
        // Hack for MDC components to render correctly.
        setTimeout(() => this.elements.forEach((el) => el.layout()), 10);
      });
    }
  }

  ngAfterViewInit() {
    this.elements = Array.from(this.myElement.nativeElement.querySelectorAll('.mdc-text-field')).map((ele) => new MDCTextField(ele));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  save() {
    this.group.title = this.title;
    this.group.description = this.description;
    this.dataModel.updateGroup(this.group);
    this.router.navigateByUrl('/');
  }

  deleteGroup() {
    this.dataModel.deleteGroup(this.group);
    this.router.navigateByUrl('/');
  }
}
