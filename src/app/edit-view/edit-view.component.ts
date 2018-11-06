import {AfterViewInit, Component, ElementRef} from '@angular/core';
import { MDCTextField} from '@material/textfield/index';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements AfterViewInit {

  private elements = [];
  constructor(private myElement: ElementRef) { }

  ngAfterViewInit() {
    this.elements = Array.from(this.myElement.nativeElement.querySelectorAll('.mdc-text-field')).map((ele) => new MDCTextField(ele));
  }

}
