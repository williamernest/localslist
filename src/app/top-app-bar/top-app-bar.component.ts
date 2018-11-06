import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MDCTopAppBar} from '@material/top-app-bar/index';


@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent implements AfterViewInit, OnDestroy {

  private topAppBar: MDCTopAppBar;
  @Input() icons = [];
  @Input() title: string;
  @Input() type = 'menu';
  @Output() navClick = new EventEmitter();

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.topAppBar = new MDCTopAppBar(this.element.nativeElement.firstChild);
    this.topAppBar.listen('MDCTopAppBar:nav', () => this.navClick.emit());
  }

  ngOnDestroy() {
    if (this.topAppBar) {
      this.topAppBar.destroy();
    }
  }
}
