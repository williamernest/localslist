import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {MDCTopAppBar} from '@material/top-app-bar/index';


@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent implements AfterViewInit, OnDestroy {

  private topAppBar: MDCTopAppBar;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.topAppBar = new MDCTopAppBar(this.element.nativeElement.firstChild);
  }

  ngOnDestroy() {
    if (this.topAppBar) {
      this.topAppBar.destroy();
    }
  }
}
